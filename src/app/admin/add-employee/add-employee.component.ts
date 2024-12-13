import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  newEmployeeForm :FormGroup;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private adminService: AdminService) {
    this.newEmployeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      salary: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]),
      username: new FormControl('',[ Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
  
    });
  }

  addEmployee()
  {
    this.adminService.addEmployee(this.newEmployeeForm.value).subscribe({
      next:(data:any)=>{
        this.showNotification("Employee added successfully", 'success');
        this.newEmployeeForm.reset();
      },
      error:(error:any)=>{
        this.showNotification("Failed to add employee, Username, Email or Mobile Number already exist", 'error');
        console.error(error);
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
