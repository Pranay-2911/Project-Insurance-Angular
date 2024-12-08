import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-change-password',
  templateUrl: './emp-change-password.component.html',
  styleUrls: ['./emp-change-password.component.css']
})
export class EmpChangePasswordComponent {

  newForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    newPassword: new FormControl(),
  });

  constructor(private employeeService: EmployeeService) { }
  chnagePassword(){
   
    this.employeeService.changePassword(this.newForm.value).subscribe({
      next:()=>{
        alert("Your password have been change successfully")
        this.newForm.reset(); // Reset the form after adding the query
      },
      error: (error: any) => {
        console.error('Error adding query:', error);
        alert("An error occurred while adding your query. Please try again later.")
      }  // Handle any errors that occur during the subscription process
    });

}

}
