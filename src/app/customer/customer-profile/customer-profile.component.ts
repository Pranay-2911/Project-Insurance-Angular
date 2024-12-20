import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent {

  customer:any;
    
  constructor(private customerService:CustomerService, private router: Router, private adminService: AdminService ){}
  ngOnInit(){
    const id = localStorage.getItem('id');
    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customer = customer
        console.log(this.customer);
      },
      error: (error) => console.log(error)
    })

    
  }

 

  

  onUpdate(){

    this.router.navigate(['customer-dashboard/update-customer']);

  }

}
