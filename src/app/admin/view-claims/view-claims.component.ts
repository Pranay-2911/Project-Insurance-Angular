import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.css']
})
export class ViewClaimsComponent {

  page=1;
  pageSize=5;
  totalClaims=0;
  claims: any;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 

  constructor(private adminService: AdminService, private emailService: EmailService, private router:Router) {}

  ngOnInit() {
    this.getAllClaims();
  }

  getAllClaims(){

    this.adminService.getAllClaims(this.page, this.pageSize, this.searchQuery).subscribe((data:any) => {
      this.claims = data.claims;
      this.filteredDocuments = this.claims;
      this.totalClaims = data.count;

    });
    

  }
  viewDetails(data:any){
    console.log(data);
    this.router.navigate(['admin-dashboard/view-customer-details'], { queryParams: { policy: JSON.stringify(data) } });
  }

  approveClaim(id:any){
    this.adminService.claimApprove(id).subscribe((data:any) => {
      console.log(data);
      this.getAllClaims();
      
      this.emailService.sendEmail(
        'pranayraut129@gmail.com',
        'Policy Claimed request approved',
        'Hello customer, Your Policy request is approved. Your withdraw amount is credited in 2 to 3 working days.'
      ).subscribe({
        next: () => console.log('Email sent successfully!'),
        error: (err) => console.error('Error sending email:', err),
      });
    });

  }

  
  filterClaims(){
    this.page=1;
    this.getAllClaims();
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllClaims();
  }
}
