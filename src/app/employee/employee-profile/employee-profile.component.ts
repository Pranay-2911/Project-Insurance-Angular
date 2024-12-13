import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AgentService } from 'src/app/services/agent.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {

  employee:any;
        
      constructor(private employeeService: EmployeeService, private router: Router, private adminService: AdminService ){}
      ngOnInit(){
        const id = localStorage.getItem('id');
        this.employeeService.getEmployee(id).subscribe({
          next: (data) => {
            this.employee = data;
            console.log(this.employee);
          },
          error: (error) => console.log(error)
        })
    
        
      }
    
     
    
      
    
      onUpdate(){
    
        this.router.navigate(['employee-dashboard/update-employee']);
    
      }

}
