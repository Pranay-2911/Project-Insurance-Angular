import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent {
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

  PayPremium(policy: any)
  {
    console.log(policy);
    this.router.navigate(['customer-dashboard/pay-premium'], { queryParams: { policyData: JSON.stringify(policy) } });
  }

}
