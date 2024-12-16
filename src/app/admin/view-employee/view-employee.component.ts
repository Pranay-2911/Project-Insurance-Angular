import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {
  employees : any;
  page = 1;
  pageSize = 5;
  totalEmployees = 0;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  constructor(private router: Router, private adminService: AdminService, private employeeService: EmployeeService) {}
  ngOnInit(){
    this.getAllEmployees();
  }

getAllEmployees(){
  this.employeeService.getEmployees(this.page, this.pageSize, this.searchQuery).subscribe({
    next: (data:any) => {
      this.employees = data.employeeDtos;
      this.filteredDocuments = this.employees;
      this.totalEmployees = data.count;
      console.log(this.employees);
    },
    error: (error) => {
      console.log(error);
    }
  });
}

filterDocuments() {
  this.page = 1;
  this.getAllEmployees();
  // const query = this.searchQuery.toLowerCase();
  // this.filteredDocuments = this.employees.filter((item:any) =>
  //   item.firstName.toLowerCase().includes(query)
  // );
}
  deleteEmployee(id: any){
    this.employeeService.deleteEmployee(id).subscribe(()=>{});
    alert('Employee deleted successfully!');
    location.reload();
  }

  activeAgent(id: any)
  {
    this.employeeService.activeEmployee(id).subscribe({
      next: () => {
        alert('Employee activated successfully!');
        this.ngOnInit(); // Refresh the table
      },
      error: (error) => {
        console.log(error);
      }
    })
    location.reload();
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllEmployees();
  }
}
