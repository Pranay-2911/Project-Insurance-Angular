import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { EmailService } from 'src/app/services/email.service';


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
  username: any;
  password: any;
  mail: any;

  constructor(private adminService: AdminService, private emailService: EmailService) {
    this.newEmployeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
        console.log(this.newEmployeeForm.value);
        this.showNotification("Employee added successfully", 'success');
        this.username = this.newEmployeeForm.value.username;
        this.password = this.newEmployeeForm.value.password;
        this.mail = this.newEmployeeForm.value.email;
        this.newEmployeeForm.reset();
     

        this.emailService.sendEmail(
          this.mail,
          'Employee Username and Password',
          'Hello Employee, Welcome to Monocept!!  this  is your username :-  ' + this.username +'  and password :-  ' + this.password
        ).subscribe({
          next: () => console.log('Email sent successfully!'),
          error: (err) => console.error('Error sending email:', err),
        });
      },
      error:(error:any)=>{
        this.showNotification("Failed to add employee, Username, Email or Mobile Number already exist", 'error');
        console.error(error);
        this.newEmployeeForm.reset();
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
