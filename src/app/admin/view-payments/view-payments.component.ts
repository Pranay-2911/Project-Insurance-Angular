import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css']
})
export class ViewPaymentsComponent {

  payments : any;
  page=1;
  pageSize=5;
  totalPayments = 0;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  startDate: string = ''
  endDate: string = '';

  constructor(private router: Router, private adminService: AdminService,private paymentService: PaymentService) {}
  ngOnInit(){
    this.getAllPayments();
  }

  getAllPayments(){
    this.paymentService.getPayments(this.page, this.pageSize, this.searchQuery, this.startDate, this.endDate).subscribe({
      next: (data:any) => {
        this.payments = data.payments;
        this.filteredDocuments=this.payments;
        this.totalPayments = data.count;
        console.log(this.payments);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    this.page = 1;
    this.getAllPayments();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.payments.filter((item:any) =>
    //   item.policyName.toLowerCase().includes(query)
    // );
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllPayments();
  }
}
