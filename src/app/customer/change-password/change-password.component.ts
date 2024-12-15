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
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

 customerId = localStorage.getItem('id');
  newForm = new FormGroup({
    id: new FormControl(),
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [
      Validators.required, 
      Validators.minLength(6),  // New password should be at least 8 characters
      
    ]),
  });

  constructor(private customerService: CustomerService) { }
  chnagePassword(){

    this.newForm.patchValue({
      id: this.customerId
    });  
   
    this.customerService.changePassword(this.newForm.value).subscribe({
      next:()=>{
        this.showNotification("Your password have been change successfully", 'success');
        this.newForm.reset(); // Reset the form after adding the query
      },
      error: (error: any) => {  
        console.error('Error adding query:', error);
        this.showNotification("Your Username is not as per details", 'error');
      }  // Handle any errors that occur during the subscription process
    });

}

showNotification(message: string, type: 'success' | 'error') {
  this.toastMessage = message;
  this.toastType = type;
  this.showToast = true;

  setTimeout(() => {
    this.showToast = false;
  }, 3000); // Hide toast after 3 seconds
}

hideToast() {
  this.showToast = false;
}

}
