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
        'Hello Agent, Your withdraw request is approved. Your withdraw amount is credited in 2 to 3 working days.' + this.link
      ).subscribe({
        next: () => console.log('Email sent successfully!'),
        error: (err) => console.error('Error sending email:', err),
      });
    });
  }
}
