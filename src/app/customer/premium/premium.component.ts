import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent {
  nomineeRelationMap: { [key: number]: string } = {
    0: 'Father',
    1: 'Mother',
    2: 'Brother',
    3: 'Sister',
  };
  policyAccounts : any;
  page = 1;
  pageSize = 5;
  totalPremium = 0;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  constructor(private router: Router, private customerService: CustomerService) {}
  ngOnInit(){
    this.getAllAccounts();
  }

  getAllAccounts(){
    this.customerService.getPolicyAccount(localStorage.getItem('id'), this.page, this.pageSize, this.searchQuery).subscribe({
      next: (data:any) => {
        this.policyAccounts = data.policyAccount;
        this.filteredDocuments = this.policyAccounts;
        this.totalPremium = data.count;
        console.log(this.policyAccounts);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    this.page=1;
    this.getAllAccounts()
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.policyAccounts.filter((item:any) =>
    //   item.policyName.toLowerCase().includes(query)
    // );
  }
  PayPremium(policy: any)
  {
    console.log(policy);
    this.router.navigate(['customer-dashboard/pay-premium'], { queryParams: { policyData: JSON.stringify(policy) } });
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllAccounts();
  }
}
