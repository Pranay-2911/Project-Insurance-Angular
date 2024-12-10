import { Component } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-view-agent-commission',
  templateUrl: './view-agent-commission.component.html',
  styleUrls: ['./view-agent-commission.component.css']
})
export class ViewAgentCommissionComponent {
  page = 1;
  pageSize = 5;
  totalCommissions = 0;
  commissions: any;
  agentId = localStorage.getItem('id');
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  searchQuery1: string = ''; 


  constructor(private agentService: AgentService) {}
  ngOnInit() {

    this.getAllCommissions();

  }

  getAllCommissions(){
    this.agentService.getCommission(this.agentId, this.page, this.pageSize, this.searchQuery).subscribe((data:any)=>{
      this.commissions = data.viewCommissionDto;
      this.filteredDocuments = this.commissions;
      this.totalCommissions = data.count;
      console.log(this.commissions);
    })
  }

  filterDocuments() {
    this.page = 1;
    this.getAllCommissions();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.commissions.filter((item:any) =>
    //   item.customerName.toLowerCase().includes(query)
    // );
  }

  filterDocumentsbyScheme() {
    this.page = 1;
    this.getAllCommissions();
    // const query = this.searchQuery1.toLowerCase();
    // this.filteredDocuments = this.commissions.filter((item:any) =>
    //   item.schemaName.toLowerCase().includes(query)
    // );
  }
  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllCommissions();
  }
}
