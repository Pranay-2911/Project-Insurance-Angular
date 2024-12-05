import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-view-policy-account',
  templateUrl: './view-policy-account.component.html',
  styleUrls: ['./view-policy-account.component.css']
})
export class ViewPolicyAccountComponent {

  policyAccounts : any;
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.adminService.getPolicyAccount().subscribe({
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
