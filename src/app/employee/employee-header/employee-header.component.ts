import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent {
name: string= "employee";
constructor(private router:Router){}
logOut(){
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  this.router.navigate(['']);
}
}
