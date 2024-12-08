import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-view-customer-policy',
  templateUrl: './view-customer-policy.component.html',
  styleUrls: ['./view-customer-policy.component.css']
})
export class ViewCustomerPolicyComponent {

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
  this.customerService.getPolicyAccount(localStorage.getItem('id'), this.page, this.pageSize).subscribe({
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

filterDocuments() {
  const query = this.searchQuery.toLowerCase();
  this.filteredDocuments = this.policyAccounts.filter((item:any) =>
    item.policyName.toLowerCase().includes(query)
  );
}

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllAccounts();
  }
}
