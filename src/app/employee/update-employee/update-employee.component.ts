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
  
    
      newEmployeeForm = new FormGroup({
        id: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl('', [Validators.required, Validators.email]),
        mobileNumber: new FormControl()
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
            window.alert('Employee profile updated successfully!');
          },
          error: (error) => console.log(error)
        });
      }

}
