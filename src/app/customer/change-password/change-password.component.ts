import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { QueryService } from 'src/app/services/query.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  newForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [
      Validators.required, 
      Validators.minLength(6),  // New password should be at least 8 characters
      
    ]),
  });

  constructor(private customerService: CustomerService) { }
  chnagePassword(){
   
    this.customerService.changePassword(this.newForm.value).subscribe({
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
