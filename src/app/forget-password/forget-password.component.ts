import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ForgetpasswordService } from '../services/forgetpassword.service';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  link = 'http://localhost:4200/update-password';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  newRequestForm = new FormGroup({
    userName: new FormControl(),
  });


  constructor(private forgetService: ForgetpasswordService, private emailService: EmailService) {}

  request()
  {
    this.forgetService.forgetPassword(this.newRequestForm.value).subscribe((data) =>{
      console.log(data);
      this.emailService.sendEmail(
        'pranayraut129@gmail.com',
        'Change Password Request',
        'Hello Agent, Your change password request is get. You can change the password through this link' + this.link
      ).subscribe({
        next: () => {
          console.log('Email sent successfully!')
          this.showNotification('Password reset link sent to your registered email.', 'success');
        },
        error: (err) => {
          console.error('Error sending email:', err)
        
          this.showNotification('Error sending email. Please try again later.', 'error');},
      });
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
