import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-tabs',
  templateUrl: './customer-tabs.component.html',
  styleUrls: ['./customer-tabs.component.css']
})
export class CustomerTabsComponent {
  name: string=''

  constructor(private router: Router){}
  addDocument(){
    this.router.navigate(['customer-dashboard/add-documents']);
  }

  viewProfile(){
    this.router.navigate(['customer-dashboard/view-profile']);
  }
  viewPolicyAccounts()
  {
  this.router.navigate(['customer-dashboard/view-customer-account']);
  }
  PayPremium(){
    this.router.navigate(['customer-dashboard/premium']);
  }

  viewQueries(){
    this.router.navigate(['customer-dashboard/view-queries']);
  }

  addQuery(){
    this.router.navigate(['customer-dashboard/add-query']);
  }
  chnagePassword()
  {
    this.router.navigate(['customer-dashboard/change-password']);
  }
}
