import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-commission-details',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.css']
})
export class CommissionDetailsComponent {
  agentId:any;
  agent:any;
  commissions:any;
  constructor(private route: ActivatedRoute, private agentService: AgentService){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.agentId = params['id'];
    });

    this.agentService.getAgent(this.agentId).subscribe(data => {
      this.agent = data;
      console.log(this.agent);
    });

    this.agentService.getCommission(this.agentId).subscribe(data=>{
      this.commissions = data;
      console.log(this.commissions);
    })

  }

  
  
}
