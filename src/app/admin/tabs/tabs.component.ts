import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

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
payments = 0;
userName: string ="";
page = 1;
pageSize=100;
constructor( private adminService: AdminService, private router: Router){}



ngOnInit(){
  this.adminService.getState().subscribe(
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

  this.adminService.getCities().subscribe({
    next: (data:any) => {
      this.citiesCount = data.length;
      this.cities = data;
    },
    error: (error:any) => {
      console.log(error);
    }
  });

  this.adminService.getPolicyAccount(this.page, this.pageSize).subscribe({
    next: (data:any) => {
      console.log(data);
      this.policyAccounts = data.count;
    },
    error: (error:any) => {
      console.log(error);
    }
  });

  this.adminService.getPlan().subscribe({
    next: (data:any) => {
      this.plans = data.length;
      console.log(this.plans);
    },
    error: (error:any) => {
      console.log(error);
    }
  });

  this.adminService.getScheme(this.page, this.pageSize).subscribe({
    next: (data:any) => {
      this.schemes = data.length;
      console.log(this.schemes);
    },
    error: (error:any) => {
      console.log(error);
    }
  })

  this.adminService.getCommissions(this.page, this.pageSize).subscribe({
    next: (data:any) => {
      this.commissions = data.length;
      console.log(this.commissions);
    },
    error: (error:any) => {
      console.log(error);
    }
  })

  this.adminService.getAllRequest(this.page, this.pageSize).subscribe({
    next: (data:any) => {
      this.withdrawCommission = data.length;
      console.log(this.withdrawCommission);
    },
    error: (error:any) => {
      console.log(error);
    }
  })

  this.adminService.getPayments(this.page, this.pageSize).subscribe({
    next: (data:any) => {
      this.payments = data.count;
      console.log(this.payments);
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
}
