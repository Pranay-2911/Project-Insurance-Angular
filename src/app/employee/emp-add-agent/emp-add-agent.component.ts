import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AgentService } from 'src/app/services/agent.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-emp-add-agent',
  templateUrl: './emp-add-agent.component.html',
  styleUrls: ['./emp-add-agent.component.css']
})
export class EmpAddAgentComponent {

  showToast = false;
  toastMessage = '';
  mail: any ;
  username: any ;
  password: any ;
  toastType: 'success' | 'error' = 'success';


  newAgentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z]+$')]),
    qualification: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]{10}$')]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])

  });

  constructor(private adminService: AdminService, private emailService: EmailService, private agentService: AgentService) {}

  addAgent()
  {
    this.agentService.addAgent(this.newAgentForm.value).subscribe({
      next: () => {
        // alert('Agent added successfully');
        this.showNotification('Agent added successfully','success');
        this.mail = this.newAgentForm.value.email;
        this.username = this.newAgentForm.value.username;
        this.password = this.newAgentForm.value.password;

        this.emailService.sendEmail(
          this.mail,
          'Agent Username and Password',
          'Hello Agent, Welcome to Monocept! Your account details are as follows:  ' + this.username +'  and password :-  ' + this.password + 'Best regards Monocept Team' 
        ).subscribe({
          next: () => console.log('Email sent successfully!'),
          error: (err) => console.error('Error sending email:', err),
        });

        this.newAgentForm.reset();
      },
      error: (error) => {
        // alert(error.error.message);
        this.showNotification("Something Went Wrong! Username, Email or Mobile number already exist!", 'error');
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
