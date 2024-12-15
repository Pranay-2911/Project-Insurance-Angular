import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-change-password',
  templateUrl: './emp-change-password.component.html',
  styleUrls: ['./emp-change-password.component.css']
})
export class EmpChangePasswordComponent {

  employeeId = localStorage.getItem('id');
  newForm = new FormGroup({
    id: new FormControl(),
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [
      Validators.required, 
      Validators.minLength(6)
    ]),
  });

  constructor(private employeeService: EmployeeService) { }
  chnagePassword(){

    this.newForm.patchValue({
      id: this.employeeId
    }); 
   
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
