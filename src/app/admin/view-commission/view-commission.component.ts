import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-commission',
  templateUrl: './view-commission.component.html',
  styleUrls: ['./view-commission.component.css']
})
export class ViewCommissionComponent {

  commissions : any;
  page = 1;
  pageSize = 5;
  totalAgents = 0;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.getAllCommission();
  }
  
  getAllCommission(){
    this.adminService.getCommissions(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.commissions = data;
        this.filteredDocuments = this.commissions;
        this.totalAgents = this.filteredDocuments.length;
        console.log(this.commissions);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDocuments = this.commissions.filter((item:any) =>
      item.agentName.toLowerCase().includes(query)
    );
  }

onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllCommission();
  }

}
