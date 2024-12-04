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
userName: string ="";
constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router){}



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

  this.adminService.getPolicyAccount().subscribe({
    next: (data:any) => {
      console.log(data);
      this.policyAccounts = data.length;
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

  this.adminService.getScheme().subscribe({
    next: (data:any) => {
      this.schemes = data.length;
      console.log(this.schemes);
    },
    error: (error:any) => {
      console.log(error);
    }
  })

  this.adminService.getCommissions().subscribe({
    next: (data:any) => {
      this.commissions = data.length;
      console.log(this.commissions);
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
}
