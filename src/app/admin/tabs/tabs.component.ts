import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CommissionService } from 'src/app/services/commission.service';
import { PaymentService } from 'src/app/services/payment.service';
import { PlanService } from 'src/app/services/plan.service';
import { PolicyAccountService } from 'src/app/services/policy-account.service';
import { StateCityService } from 'src/app/services/state-city.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
citiesCount: number =0;
cities:any;
states: any;
statesCount:number =0;
policyAccounts: number =0;
plans: number =0;
schemes: number =0;
commissions: number =0;
withdrawCommission = 0;
claimRequest =0;
payments = 0;
userName: string ="";
page = 1;
pageSize=100;
constructor( private adminService: AdminService, private router: Router, private planService: PlanService, private stateCityService: StateCityService, private policyAccountService: PolicyAccountService,
  private commissionService: CommissionService, private paymentsService: PaymentService
){}



ngOnInit(){
  this.stateCityService.getState().subscribe(
    {
      next: (data:any) => {
        this.states = data;
        this.statesCount = this.states.length;

      },
      error: (error:any) => {
        console.log(error);
      }
    }
  );

  this.stateCityService.getCities().subscribe({
    next: (data:any) => {
      this.citiesCount = data.length;
      this.cities = data;
    },
    error: (error:any) => {
      console.log(error);
    }
  });

  this.policyAccountService.getPolicyAccount(this.page, this.pageSize).subscribe({
    next: (data:any) => {
      console.log(data);
      this.policyAccounts = data.count;
    },
    error: (error:any) => {
      console.log(error);
    }
  });

  this.planService.getAllPlans().subscribe({
    next: (data:any) => {
      this.plans = data.length;
      console.log(this.plans);
    },
    error: (error:any) => {
      console.log(error);
    }
  });

  this.planService.getSchemes(this.page, this.pageSize, '').subscribe({
    next: (data:any) => {
      this.schemes = data.count;
      console.log(this.schemes);
    },
    error: (error:any) => {
      console.log(error);
    }
  })

  this.adminService.getCommissions(this.page, this.pageSize, '', '', '', '').subscribe({
    next: (data:any) => {
      this.commissions = data.count;
      console.log(this.commissions);
    },
    error: (error:any) => {
      console.log(error);
    }
  })

  this.commissionService.getAllRequest(this.page, this.pageSize).subscribe({
    next: (data:any) => {
      this.withdrawCommission = data.count;
      console.log(this.withdrawCommission);
    },
    error: (error:any) => {
      console.log(error);
    }
  })

  this.paymentsService.getPayments(this.page, this.pageSize, '', '', '').subscribe({
    next: (data:any) => {
      this.payments = data.count;
      console.log(this.payments);
    },
    error: (error:any) => {
      console.log(error);
    }
  })

  this.policyAccountService.getAllClaims(this.page, this.pageSize, '').subscribe({
    next: (data:any) => {
      this.claimRequest = data.count;
      console.log(this.claimRequest);
    },
    error: (error:any) => {
      console.log(error);
    }
  })
}

StateView()
{
  console.log(this.states);
  this.router.navigate(['admin-dashboard/view-state']);
}
LoadPage(){
  this.router.navigate(['admin-dashboard/viewplans']);
}

viewCity(){
  this.router.navigate(['admin-dashboard/view-city']);
}

viewSchemes(){
  this.router.navigate(['admin-dashboard/view-schemes']);
}

viewCommission(){
  this.router.navigate(['admin-dashboard/view-commission']);
}

viewPolicyAccounts()
{
  this.router.navigate(['admin-dashboard/view-policy-account']);
}
viewRequest()
{
  this.router.navigate(['admin-dashboard/withdraw-approve']);
}
viewPayments()
{
  this.router.navigate(['admin-dashboard/view-payments']);
}

viewClaim()
{
  this.router.navigate(['admin-dashboard/view-claims']);
}
}
