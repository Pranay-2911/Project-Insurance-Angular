import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { StateCityService } from 'src/app/services/state-city.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent {
  customer: any = {}; // Use `any` type
  states: any = [];
  cities: any = [];

  showToast = false;
   toastMessage = '';
   toastType: 'success' | 'error' = 'success';

  newCustomerForm = new FormGroup({
    customerId: new FormControl(null),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('',[Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required])
  });

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private adminService: AdminService,
    private stateCityService: StateCityService
  ) {}

  ngOnInit() {
    const id = localStorage.getItem('id');

    // Fetch customer details
    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customer = customer; // Assign the response to `customer`
        this.newCustomerForm.patchValue(customer);
        this.loadStates(this.customer?.state); // Use optional chaining to access `state`
      },
      error: (error) => console.log(error)
    });
  }

  loadStates(selectedStateName: string): void {
    this.stateCityService.getState().subscribe({
      next: (data) => {
        this.states = data;
        this.newCustomerForm.controls['state'].setValue(selectedStateName);

        const selectedState = this.states.find((state: any) => state.name === selectedStateName);
        if (selectedState) {
          this.cities = selectedState.cities;
          this.newCustomerForm.controls['city'].setValue(this.customer?.city);
        }
      },
      error: (error) => console.log(error)
    });
  }

  onStateChange(event: Event): void {
    const stateName = (event.target as HTMLSelectElement).value;
    const selectedState = this.states.find((state: any) => state.name === stateName);

    this.cities = selectedState ? selectedState.cities : [];
    this.newCustomerForm.controls['city'].setValue('');
  }

  onUpdate() {
    console.log(this.newCustomerForm.value);
    this.customerService.updateCustomer(this.newCustomerForm.value).subscribe({
      next: (data) => {
        console.log(data);
        // window.alert('Customer profile updated successfully!');
        this.showNotification('Customer profile updated successfully!', 'success');

        // Redirect to the customer dashboard page
        this.router.navigate(['/customer-dashboard/customer-tabs']);
      },
      error: (error) => {
        console.log(error)
        this.showNotification("Something went wrong! Email or Mobile number is already exist!", 'error')
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
