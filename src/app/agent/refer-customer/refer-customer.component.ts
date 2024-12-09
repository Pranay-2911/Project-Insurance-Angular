import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-refer-customer',
  templateUrl: './refer-customer.component.html',
  styleUrls: ['./refer-customer.component.css']
})
export class ReferCustomerComponent {
  customers: any[] = [];
  filteredDocuments: any[] = [];
  searchQuery: string = '';
  page = 1;
  pageSize = 5;
  totalItems = 0;
  policyId : any;

  constructor(private router: Router, private customerService: CustomerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllCustomers();
    this.policyId = localStorage.getItem('policyId');
    this.route.queryParams.subscribe(params => {
      this.policyId = params['policyId'];
      
    });

  }

  getAllCustomers(): void {
    this.customerService.getAllCustomer(this.page, this.pageSize).subscribe({
      next: (data: any) => {
        this.customers = data.customers || data; // Adjust based on API response structure
        this.totalItems = data.totalCount || this.customers.length; // Adjust if API provides total count
        this.filteredDocuments = [...this.customers];
        console.log('Customers:', this.customers);
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      },
    });
  }

  referCustomer(id: any)
  {
     console.log(this.policyId);
     console.log(id);
  }

  filterDocuments(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredDocuments = this.customers.filter((item: any) =>
      item.firstName.toLowerCase().includes(query)
    );
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllCustomers();
  }
}
