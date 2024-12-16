import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CommissionService } from 'src/app/services/commission.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-withdraw-approve',
  templateUrl: './withdraw-approve.component.html',
  styleUrls: ['./withdraw-approve.component.css']
})
export class WithdrawApproveComponent {
page=1;
pageSize=5;
totalRequests=0;
filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  requests : any;
  constructor(private router: Router, private adminService: AdminService, private emailService:EmailService, private commissionService: CommissionService) {}
  ngOnInit(){
    this.getAllRequest();
  }

  getAllRequest(){
    this.commissionService.getAllRequest(this.page, this.pageSize, this.searchQuery).subscribe({
      next: (data:any) => {
        this.requests = data.requests;
        this.filteredDocuments = this.requests;
        this.totalRequests = data.count;
        console.log(this.requests);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    this.page = 1;
    this.getAllRequest();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.requests.filter((item:any) =>
    //   item.agentName.toLowerCase().includes(query)
    // );
  }
  approveRequest(requestId: string) {
    this.commissionService.approve(requestId).subscribe({
      next: () => {
        alert('Request approved successfully!');
        this.emailService.sendEmail(
          'pranayraut129@gmail.com',
          'Withdraw commission request approved',
          'Hello Agent, Your withdraw request is approved. Your withdraw amount is credited in 2 to 3 working days.'
        ).subscribe({
          next: () => console.log('Email sent successfully!'),
          error: (err) => console.error('Error sending email:', err),
        });
        this.ngOnInit(); // Refresh the table
      },
      error: (error) => {
        console.log(error);
        alert('An error occurred while approving the request.');
      }
    });
  }
  
  rejectRequest(requestId: string) {
    this.commissionService.reject(requestId).subscribe({
      next: () => {
        alert('Request rejected successfully!');
        this.emailService.sendEmail(
          'pranayraut129@gmail.com',
          'Withdraw commission request rejected',
          'Hello Agent, Your withdraw request is rejected. We cannot able to send your request amount'
        ).subscribe({
          next: () => console.log('Email sent successfully!'),
          error: (err) => console.error('Error sending email:', err),
        });
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
