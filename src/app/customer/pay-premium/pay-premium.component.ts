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
      this.premiums = res.premiums;
      this.totalPremium = res.count;
      console.log(this.premiums);
    });
  }

  isDueDatePassed(dueDate: string): boolean {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
  
    // Calculate the date one month before the due date
    const oneMonthBeforeDueDate = new Date(dueDateObj);
    oneMonthBeforeDueDate.setMonth(oneMonthBeforeDueDate.getMonth() - 1);
  
    // Check if today is within the valid range (one month before the due date and not after it)
    return today >= oneMonthBeforeDueDate && today > dueDateObj;
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

  selectedReceipt: any = null; // Added for storing the selected receipt

showReceipt(premium: any) {
  this.selectedReceipt = premium; // Store the selected premium details
}

closeReceipt() {
  this.selectedReceipt = null; // Clear the selected receipt
}
}

