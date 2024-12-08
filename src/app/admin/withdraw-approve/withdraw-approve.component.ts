import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-withdraw-approve',
  templateUrl: './withdraw-approve.component.html',
  styleUrls: ['./withdraw-approve.component.css']
})
export class WithdrawApproveComponent {
page=1;
pageSize=5;
filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  requests : any;
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.getAllRequest();
  }

  getAllRequest(){
    this.adminService.getAllRequest(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.requests = data;
        this.filteredDocuments = this.requests;
        console.log(this.requests);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDocuments = this.requests.filter((item:any) =>
      item.agentName.toLowerCase().includes(query)
    );
  }
  approveRequest(requestId: string) {
    this.adminService.approve(requestId).subscribe({
      next: () => {
        alert('Request approved successfully!');
        this.ngOnInit(); // Refresh the table
      },
      error: (error) => {
        console.log(error);
        alert('An error occurred while approving the request.');
      }
    });
  }
  
  rejectRequest(requestId: string) {
    this.adminService.reject(requestId).subscribe({
      next: () => {
        alert('Request rejected successfully!');
        this.ngOnInit(); // Refresh the table
      },
      error: (error) => {
        console.log(error);
        alert('An error occurred while rejecting the request.');
      }
    });
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllRequest();
  }
}
