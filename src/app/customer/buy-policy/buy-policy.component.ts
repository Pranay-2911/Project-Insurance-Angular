import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-buy-policy',
  templateUrl: './buy-policy.component.html',
  styleUrls: ['./buy-policy.component.css']
})
export class BuyPolicyComponent {

  schemeId: any = '';
  nominees:any;
  customerId:any;
  newPolicyForm = new FormGroup({
    policyId: new FormControl(),
    totalAmount: new FormControl(),
    durationInMonths: new FormControl(),
    nominee: new FormControl(),
    nomineeRelation: new FormControl(),
    customerId: new FormControl()
  });

 
  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router, private enumService: EnumService) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params=>{
      this.schemeId = params['schemeId']
    });

    this.enumService.getNominee().subscribe({
      next:(data:any)=>{
        this.nominees = data;
      },
      error:(err) => console.error('There was an error!', err)
    })

    this.customerId = localStorage.getItem('id');
  }

  addnewPolicy()
  {
    this.newPolicyForm.patchValue({
      policyId : this.schemeId,
      customerId: localStorage.getItem('id')
    });
    
    console.log(this.newPolicyForm.value);
    this.customerService.buyPolicy(this.newPolicyForm.value).subscribe({
      next: (data: any) => {
        alert("Policy Purchase Successfully");
      },
      error: (err) => {
        console.error('There was an error!', err);
      }
     });
    
  }
  


}
