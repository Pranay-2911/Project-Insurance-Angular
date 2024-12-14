import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-emp-add-agent',
  templateUrl: './emp-add-agent.component.html',
  styleUrls: ['./emp-add-agent.component.css']
})
export class EmpAddAgentComponent {

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';


  newAgentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    qualification: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])

  });

  constructor(private adminService: AdminService) {}

  addAgent()
  {
    this.adminService.addAgent(this.newAgentForm.value).subscribe({
      next: () => {
        // alert('Agent added successfully');
        this.showNotification('Agent added successfully','success');
        this.newAgentForm.reset();
      },
      error: (error) => {
        // alert(error.error.message);
        this.showNotification("Something Went Wrong! or Username already exist!", 'error');
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
