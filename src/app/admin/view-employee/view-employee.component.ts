import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
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
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.getAllEmployees();
  }

getAllEmployees(){
  this.adminService.getEmployee(this.page, this.pageSize).subscribe({
    next: (data) => {
      this.employees = data;
      this.filteredDocuments = this.employees;
      this.totalEmployees = this.filteredDocuments.length;
      console.log(this.employees);
    },
    error: (error) => {
      console.log(error);
    }
  });
}

filterDocuments() {
  const query = this.searchQuery.toLowerCase();
  this.filteredDocuments = this.employees.filter((item:any) =>
    item.firstName.toLowerCase().includes(query)
  );
}
  deleteEmployee(id: any){
    this.adminService.deleteEmployee(id).subscribe(()=>{});
    alert('Employee deleted successfully!');
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
