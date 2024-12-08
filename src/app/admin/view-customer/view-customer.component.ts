import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
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
