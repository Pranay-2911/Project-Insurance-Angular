import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent {

   agent:any;
      
    constructor(private agentService: AgentService, private router: Router, private adminService: AdminService ){}
    ngOnInit(){
      const id = localStorage.getItem('id');
      this.agentService.getAgent(id).subscribe({
        next: (customer) => {
          this.agent = customer
          console.log(this.agent);
        },
        error: (error) => console.log(error)
      })
  
      
    }
  
   
  
    
  
    onUpdate(){
  
      this.router.navigate(['agent-dashboard/update-agent']);
  
    }

}
