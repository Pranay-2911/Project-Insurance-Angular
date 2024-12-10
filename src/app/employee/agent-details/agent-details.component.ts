import { Component } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent {

  page = 1;
  pageSize = 5;
  totalAgents = 0; 
  agents: any;
  filteredAgents: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 

  constructor(public agentService: AgentService, private router: Router){}
  ngOnInit(){
    this.getAllAgents();
    
  }

  getAllAgents(){
    this.agentService.getAgents(this.page, this.pageSize, this.searchQuery).subscribe({
      next: (data:any) => {
        this.agents = data.agents;
        this.totalAgents = data.count;
        this.filteredAgents = this.agents;
        console.log(this.agents);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    this.page=1;
    this.getAllAgents();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredAgents = this.agents.filter((item:any) =>
    //   item.firstName.toLowerCase().includes(query)
    // );
  }

  viewAgentDetails(id:any){
    this.router.navigate(['employee-dashboard/view-commission'], {queryParams: {id:id}});
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllAgents();
  }
}
