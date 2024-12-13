import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AgentService } from 'src/app/services/agent.service';
@Component({
  selector: 'app-employee-tabs',
  templateUrl: './employee-tabs.component.html',
  styleUrls: ['./employee-tabs.component.css']
})
export class EmployeeTabsComponent {
  queries = 0;
  reports:any;
  agent:any;
  page = 1;
  pageSize = 100;
  userName: string ="";
  constructor( private router: Router, private agentService: AgentService){}



ngOnInit(){
 this.agentService.getAgents(this.page, this.pageSize).subscribe({
  next: (data:any) => {
    this.reports = data.length;
    this.agent = data;
  },
  error: (error:any) => {
    console.log(error);
  }
 })


  // this.adminService.getCommissions().subscribe({
  //   next: (data:any) => {
  //     this.commissions = data.length;
  //     console.log(this.commissions);
  //   },
  //   error: (error:any) => {
  //     console.log(error);
  //   }
  // })

}

viewProfile(){
  this.router.navigate(['employee-dashboard/employee-profile'])
}

verify(){
  this.router.navigate(['employee-dashboard/verify-document'])
}

viewAgents(){
  this.router.navigate(['employee-dashboard/view-agents'])
}
changePassword(){
  this.router.navigate(['employee-dashboard/change-password']);
}
query()
{
  this.router.navigate(['employee-dashboard/query-response']);
}
}
