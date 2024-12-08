import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-view-policy-account',
  templateUrl: './view-policy-account.component.html',
  styleUrls: ['./view-policy-account.component.css']
})
export class ViewPolicyAccountComponent {

  policyAccounts : any;
  page = 1;
  pageSize = 5;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  searchQuery1: string = ''; 
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.getPolicyAccounts();
  }

  getPolicyAccounts(){
    this.adminService.getPolicyAccount(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.policyAccounts = data;
        this.filteredDocuments = this.policyAccounts;
        console.log(this.policyAccounts);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocumentsbyPolicy() {
    const query = this.searchQuery1.toLowerCase();
    this.filteredDocuments = this.policyAccounts.filter((item:any) =>
      item.policyName.toLowerCase().includes(query)
    );
  }

  filterDocuments() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDocuments = this.policyAccounts.filter((item:any) =>
      item.customerName.toLowerCase().includes(query)
    );
  }
  
  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getPolicyAccounts();
  }
}
