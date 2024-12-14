import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

   employee: any ; // Use `any` type
   showToast = false;
   toastMessage = '';
   toastType: 'success' | 'error' = 'success';
    
      newEmployeeForm = new FormGroup({
        id: new FormControl(),
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        mobileNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      });
    
      constructor(
        private employeeService: EmployeeService,
        private router: Router
      ) {}
    
      ngOnInit() {
        const id = localStorage.getItem('id');
    
        // Fetch customer details
        this.employeeService.getEmployee(id).subscribe({
          next: (data) => {
            this.employee = data; // Assign the response to `customer`
            this.newEmployeeForm.patchValue(data);
          },
          error: (error) => console.log(error)
        });
      }
    
    
      onUpdate() {
        console.log(this.newEmployeeForm.value);
        this.employeeService.updateEmployee(this.newEmployeeForm.value).subscribe({
          next: (data) => {
            console.log(data);
            // window.alert('Employee profile updated successfully!');
            this.showNotification('Employee profile updated successfully!','success');
          },
          error: (error) => {
            console.log(error)
            this.showNotification("Something went wrong! Employee email or mobile number is already exists!", 'error');
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
