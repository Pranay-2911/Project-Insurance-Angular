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
  selectedCommissionType: string = ''; // Holds the selected value of the radio button

  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.getAllCommission();
  }
  
  getAllCommission(){
    this.adminService.getCommissions(this.page, this.pageSize, this.searchQuery, this.selectedCommissionType).subscribe({
      next: (data:any) => {
        this.commissions = data.viewCommissionDto;
        this.filteredDocuments = this.commissions;
        this.totalAgents = data.count;
        console.log(this.commissions);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString(); // Adjust locale as needed
  }

  filterDocuments() {
    this.page = 1;
    this.getAllCommission();
  }

onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllCommission();
  }

}
