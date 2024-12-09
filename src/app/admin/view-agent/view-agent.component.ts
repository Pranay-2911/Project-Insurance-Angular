import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AgentService } from 'src/app/services/agent.service';
@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent {
  agents : any;
  page = 1;
  pageSize = 5;
  totalAgents = 0;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  constructor(private router: Router, private adminService: AdminService, private agentService: AgentService) {}
  ngOnInit(){
    this.getAllAgents()
  }

  getAllAgents(){
    this.adminService.getAgent(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.agents = data;
        this.filteredDocuments = this.agents;
        this.totalAgents = this.filteredDocuments.length;
        console.log(this.agents);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDocuments = this.agents.filter((item:any) =>
      item.firstName.toLowerCase().includes(query)
    );
  }
  deleteAgent(id: any){
    this.adminService.deleteAgent(id).subscribe(()=>{});
    alert('Agent deleted successfully!');
    location.reload();
  }
  activeAgent(id: any)
  {
    this.agentService.activeAgent(id).subscribe({
      next: () => {
        alert('Agent activated successfully!');
        this.ngOnInit(); // Refresh the table
      },
      error: (error) => {
        console.log(error);
      }
    })
    location.reload();
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllAgents();
  }

}
