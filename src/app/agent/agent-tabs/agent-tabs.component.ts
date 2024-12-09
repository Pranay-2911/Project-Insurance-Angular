import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-tabs',
  templateUrl: './agent-tabs.component.html',
  styleUrls: ['./agent-tabs.component.css']
})
export class AgentTabsComponent {
  name: string=""

  constructor( private router: Router){}

  viewCommission()
  {
      this.router.navigate(['agent-dashboard/view-agent-commission']);
  }
  withdrawCommission()
  {
    this.router.navigate(['agent-dashboard/withdraw-commission']);
  }
  chnagePassword()
  {
    this.router.navigate(['agent-dashboard/change-password']);
  }
  onMarketing(){
    this.router.navigate(['agent-dashboard/marketing']);
  }
}
