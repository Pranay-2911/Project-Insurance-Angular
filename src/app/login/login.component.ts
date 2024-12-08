import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginForm = new FormGroup({
  username: new FormControl('',Validators.required),
  password: new FormControl('',Validators.required),
  reCaptcha: new FormControl('',Validators.required)
})

role:any=""
token:any;
generatedCaptcha:string="";
errorMessage: string = '';
error:any=''
constructor (private route:Router, private loginService:LoginService){
  this.generateCaptcha();
}

generateCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  this.generatedCaptcha = Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
}


logIn() {
  if (this.loginForm.valid) {
    const enteredCaptcha = this.loginForm.value.reCaptcha;
    if (enteredCaptcha !== this.generatedCaptcha) {
      this.errorMessage = 'Invalid CAPTCHA. Please try again.';
      this.generateCaptcha(); 
    } else {
      this.errorMessage = ''; // Clear error message
      console.log('Form submitted successfully:', this.loginForm.value);
      // Proceed with your login logic (e.g., API call)

      this.loginService.logIn(this.loginForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.token = response.headers.get('Jwt');
          localStorage.setItem('token', this.token);
          this.role = response.body;
          const tokenInfo = this.getDecodedAccessToken(this.token);
          const id = tokenInfo.Id;
          console.log(id);
    
          if(this.role.roleName === 'ADMIN'){
            localStorage.setItem('roleName', this.role.roleName);
              this.route.navigate(['admin-dashboard/tabs'], { queryParams: { username: this.role.username } });
          }
          else if(this.role.roleName === "EMPLOYEE"){
            localStorage.setItem('roleName', this.role.roleName);
            localStorage.setItem('id', tokenInfo.Id);
              this.route.navigate(['employee-dashboard/tabs']);
          }
          else if(this.role.roleName === "AGENT"){
            localStorage.setItem('roleName', this.role.roleName);
            localStorage.setItem('id', tokenInfo.Id);
              this.route.navigate(['agent-dashboard/agent-tabs']);
          }
          else{
            localStorage.setItem('roleName', this.role.roleName);
            localStorage.setItem('id', tokenInfo.Id);
              this.route.navigate(['customer-dashboard/customer-tabs']);
          }
        
        },
        error:(errors:HttpErrorResponse)=>{
          console.error(errors);
          if(errors.error){
            this.error = errors.error.exceptionMessage;
          }
          else{
            this.error = "An unexpected error occurred";
          }
        }
      })
    }
  } else {
    this.errorMessage = 'Please fill out all required fields.';
  }


}

getDecodedAccessToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch(Error) {
    return null;
  }
}

}
