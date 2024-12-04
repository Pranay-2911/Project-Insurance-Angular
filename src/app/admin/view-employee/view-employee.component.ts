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
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.adminService.getEmployee().subscribe({
      next: (data) => {
        this.employees = data;
        console.log(this.employees);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
