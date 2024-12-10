import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-customer-agent',
  templateUrl: './view-customer-agent.component.html',
  styleUrls: ['./view-customer-agent.component.css']
})
export class ViewCustomerAgentComponent implements OnInit {
  customers: any[] = [];
  filteredDocuments: any[] = [];
  searchQuery: string = '';
  page = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(private router: Router, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomer(this.page, this.pageSize, this.searchQuery).subscribe({
      next: (data: any) => {
        this.customers = data.customerDtos; // Adjust based on API response structure
        this.totalItems = data.count; // Adjust if API provides total count
        this.filteredDocuments = [...this.customers];
        console.log('Customers:', this.customers);
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      },
    });
  }

  filterDocuments(): void {
    this.page = 1;
    this.getAllCustomers();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.customers.filter((item: any) =>
    //   item.firstName.toLowerCase().includes(query)
    // );
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllCustomers();
  }
}

