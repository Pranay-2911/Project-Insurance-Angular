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
  page = 1;
  pageSize = 5;
  totalCommissions = 0; 
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 

  constructor(private route: ActivatedRoute, private agentService: AgentService){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.agentId = params['id'];
    });

    this.agentService.getAgent(this.agentId).subscribe(data => {
      this.agent = data;
      console.log(this.agent);
    });

    this.getAllCommissions();

  }

  filterDocuments() {
    this.page = 1;
    this.getAllCommissions();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.commissions.filter((item:any) =>
    //   item.agentName.toLowerCase().includes(query)
    // );
  }
  getAllCommissions() {
    this.agentService.getCommission(this.agentId, this.page, this.pageSize, this.searchQuery).subscribe((data:any)=>{
      this.commissions = data.viewCommissionDto;
      this.filteredDocuments = this.commissions;
      this.totalCommissions = data.count;
      console.log(this.commissions);
    })
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllCommissions();
  }
  
}
