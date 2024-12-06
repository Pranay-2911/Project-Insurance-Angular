import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent {
  name:string = 'customer';
  plan:any;

  constructor(private router:Router){}
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['']);
  }
  
}
