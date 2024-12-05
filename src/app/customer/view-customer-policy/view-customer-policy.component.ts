import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-view-customer-policy',
  templateUrl: './view-customer-policy.component.html',
  styleUrls: ['./view-customer-policy.component.css']
})
export class ViewCustomerPolicyComponent {

  nomineeRelationMap: { [key: number]: string } = {
    0: 'Father',
    1: 'Mother',
    2: 'Brother',
    3: 'Sister',
  };
  
  policyAccounts : any;
  constructor(private router: Router, private customerService: CustomerService) {}
  ngOnInit(){
    this.customerService.getPolicyAccount(localStorage.getItem('id')).subscribe({
      next: (data) => {
        this.policyAccounts = data;
        console.log(this.policyAccounts);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
