import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { EmailService } from 'src/app/services/email.service';

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
  link : any;
  agentId = localStorage.getItem('id');

  constructor(private router: Router, private customerService: CustomerService, private route: ActivatedRoute, private emailService: EmailService) {}

  ngOnInit(): void {
    this.getAllCustomers();
    this.policyId = localStorage.getItem('policyId');
    this.route.queryParams.subscribe(params => {
      this.policyId = params['policyId'];
      
    });

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

  referCustomer(id: any)
  {
     console.log(this.policyId);
     console.log(id);
     this.link = `http://localhost:4200/customer-dashboard/details/${this.agentId}/${this.policyId}`;
     this.emailService.sendEmail(
      'pranayraut129@gmail.com',
      'Policy Refrence',
      'Hello Customer, Plz take yor time to view this policy and puchase ' + this.link
    ).subscribe({
      next: () => console.log('Email sent successfully!'),
      error: (err) => console.error('Error sending email:', err),
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
