import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent {

  customers : any;
  constructor(private router: Router, private customerService: CustomerService) {}
  ngOnInit(){
    this.customerService.getAllCustomer().subscribe({
      next: (data) => {
        this.customers = data;
        console.log(this.customers);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
