import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm = new FormGroup({
  username: new FormControl('',Validators.required),
  password: new FormControl('',Validators.required),
  // reCaptcha: new FormControl('',Validators.required)
})

role:any=""
token:any;
constructor (private route:Router, private loginService:LoginService){}


logIn(){
  console.log(this.loginForm.value);
  
    this.loginService.logIn(this.loginForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.token = response.headers.get('Jwt');
        localStorage.setItem('token', this.token);
        this.role = response.body;
  
        if(this.role.roleName === 'ADMIN'){
            this.route.navigate(['admin-dashboard/tabs'], { queryParams: { username: this.role.username } });
        }
        else if(this.role.roleName === "EMPLOYEE"){
            this.route.navigate(['employee-dashboard']);
        }
        else if(this.role.roleName === "AGENT"){
            this.route.navigate(['agent-dashboard']);
        }
        else{
            this.route.navigate(['customer-dashboard']);
        }
  
      },
      error:(error:HttpErrorResponse)=>{
        console.error(error);
      }
    })
}
}
