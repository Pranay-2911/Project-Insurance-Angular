import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { dateOfBirthValidator } from '../validators/custom-validators';
import { StateCityService } from '../services/state-city.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent {

  states: any = []; // Array to store states
  cities: any = [];
  mail: any ;
  username: any
  password: any;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  newCustomerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$') ]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required, dateOfBirthValidator]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])

  });

  constructor(private customerService: CustomerService, private adminService: AdminService, private router: Router, private emailService: EmailService, private stateCityService: StateCityService) {}

  ngOnInit(){
    this.stateCityService.getState().subscribe({
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
    const stateName = (event.target as HTMLSelectElement).value;
    const selectedState = this.states.find((state: any) => state.name === stateName);
    this.cities = selectedState ? selectedState.cities : [];
    this.newCustomerForm.controls['city'].setValue(''); // Clear city when state changes
  }
  

  addCustomer() {
    this.customerService.addCustomer(this.newCustomerForm.value).subscribe({

      next: (data) => {
        console.log(data);
        this.mail = this.newCustomerForm.value.email;
        this.username = this.newCustomerForm.value.username;
        this.password = this.newCustomerForm.value.password;

        this.emailService.sendEmail(
          this.mail,
          'Username and Password',
          'Hello Customer, Welcome to Monocept!!  this  is your username :-  ' + this.username +'  and password :-  ' + this.password
        ).subscribe({
          next: () => console.log('Email sent successfully!'),
          error: (err) => console.error('Error sending email:', err),
        });

        this.newCustomerForm.reset();  // Reset form after successful submission

        // Show alert after successful registration
        // window.alert('Customer registered successfully!');
        this.showNotification('Customer registered successfully!','success');
        

        // Redirect to the login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during registration:', error);
        // window.alert('Registration failed. Please try again.');
        this.showNotification('Registration failed. Username, email or mobile number already exist!.', 'error');
      }
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
