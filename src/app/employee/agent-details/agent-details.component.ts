import { Component } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent {

  agents: any;
  constructor(public agentService: AgentService, private router: Router){}
  ngOnInit(){
    this.agentService.getAgents().subscribe({
      next: (data) => {
        this.agents = data;
        console.log(this.agents);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  viewAgentDetails(id:any){
    this.router.navigate(['employee-dashboard/view-commission'], {queryParams: {id:id}});
  }
}
