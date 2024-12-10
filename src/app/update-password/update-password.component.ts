import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ForgetpasswordService } from '../services/forgetpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  newRequestForm = new FormGroup({
    userName: new FormControl(),
    newPassword: new FormControl()
  });


  constructor(private forgetService: ForgetpasswordService, private router: Router) {}

  request()
  {
    this.forgetService.changePassword(this.newRequestForm.value).subscribe((data) =>{
      console.log(data);
      alert("Changed Successfully")
      this.router.navigate(['/login']);
     
    });
  }
}
