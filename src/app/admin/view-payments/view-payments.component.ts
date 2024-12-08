import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css']
})
export class ViewPaymentsComponent {

  payments : any;
  page=1;
  pageSize=5;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.getAllPayments();
  }

  getAllPayments(){
    this.adminService.getPayments(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.payments = data;
        this.filteredDocuments=this.payments;
        console.log(this.payments);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDocuments = this.payments.filter((item:any) =>
      item.policyName.toLowerCase().includes(query)
    );
  }
  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllPayments();
  }
}
