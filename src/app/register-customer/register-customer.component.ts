import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent {

  states: any = []; // Array to store states
  cities: any = [];

  newCustomerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    mobileNumber: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
    dateOfBirth: new FormControl(),
    username: new FormControl(),
    password: new FormControl()

  });

  constructor(private customerService: CustomerService, private adminService: AdminService, private router: Router) {}

  ngOnInit(){
    this.adminService.getState().subscribe({
      next: (data) => {
        this.states = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onStateChange(event: Event): void {
    const stateId = (event.target as HTMLSelectElement).value;
    const selectedState = this.states.find((state: any) => state.id === stateId);
    this.cities = selectedState ? selectedState.cities : [];
    this.newCustomerForm.controls['city'].setValue(''); // Clear city when state changes
  }
  

  addCustomer() {
    this.customerService.addCustomer(this.newCustomerForm.value).subscribe({

      next: (data) => {
        console.log(data);
        this.newCustomerForm.reset();  // Reset form after successful submission

        // Show alert after successful registration
        window.alert('Customer registered successfully!');

        // Redirect to the login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during registration:', error);
        window.alert('Registration failed. Please try again.');
      }
    });
  }


}
