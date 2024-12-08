import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PremiumService } from 'src/app/services/premium.service';
@Component({
  selector: 'app-pay-premium',
  templateUrl: './pay-premium.component.html',
  styleUrls: ['./pay-premium.component.css']
})
export class PayPremiumComponent {
  policy:any;
  premiums:any;
  page = 1;
  pageSize = 5;
  totalPremium = 0;
  nomineeRelationMap: { [key: number]: string } = {
    0: 'Father',
    1: 'Mother',
    2: 'Brother',
    3: 'Sister',
  };
  constructor(private route: ActivatedRoute, private premiumService: PremiumService, private router:Router){}
  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      this.policy = JSON.parse(params['policyData']);
      console.log(this.policy);  
    })

    this.getAllPremiums();
  }

  getAllPremiums(){
    this.premiumService.getPremium(this.policy.id, this.page, this.pageSize).subscribe((res:any) => {
      this.premiums = res;
      console.log(this.premiums);
    });
  }

  onPay(amount:any, id:any){
    console.log(amount);
    this.router.navigate(['customer-dashboard/payment'], {queryParams: {amount:amount, premiumId: id}});
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllPremiums();
  }
}

