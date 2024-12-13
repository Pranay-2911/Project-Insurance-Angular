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
  totalAccounts = 0;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  searchQuery1: string = ''; 
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.getPolicyAccounts();
  }

  getPolicyAccounts(){
    this.adminService.getPolicyAccount(this.page, this.pageSize, this.searchQuery, this.searchQuery1).subscribe({
      next: (data:any) => {
        console.log(data);
        this.policyAccounts = data.accounts;
        this.filteredDocuments = this.policyAccounts;
        this.totalAccounts = data.count;
        console.log(this.policyAccounts);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getNomineeRelation(relation: number): string {
    const relations = ['Father', 'Mother', 'Brother', 'Sister'];
    return relations[relation] || 'Unknown';
  }
  filterDocumentsbyPolicy() {
    this.page = 1;
    this.getPolicyAccounts();

    // const query = this.searchQuery1.toLowerCase();
    // this.filteredDocuments = this.policyAccounts.filter((item:any) =>
    //   item.policyName.toLowerCase().includes(query)
    // );
  }

  filterDocuments() {
    this.page = 1;
    this.getPolicyAccounts();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.policyAccounts.filter((item:any) =>
    //   item.customerName.toLowerCase().includes(query)
    // );
  }
  
  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getPolicyAccounts();
  }
}
