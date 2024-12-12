import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { EnumService } from 'src/app/services/enum.service';
import { PlanService } from 'src/app/services/plan.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-buy-policy',
  templateUrl: './buy-policy.component.html',
  styleUrls: ['./buy-policy.component.css']
})
export class BuyPolicyComponent {

  schemeId: any = '';
  nominees:any;
  customerId:any;
  scheme:any;
  newPolicyForm : FormGroup; 

 
  constructor(private customerService: CustomerService, private uploadService: UploadService, private route: ActivatedRoute, private router: Router, private enumService: EnumService, private planService: PlanService, private fb: FormBuilder) { 
    this.newPolicyForm = this.fb.group({
      policyId: [null, Validators.required],
      totalAmount: [null, Validators.required],
      durationInMonths: [null, Validators.required],
      nominee: ['', Validators.required],
      nomineeRelation: ['', Validators.required],
      customerId: [null, Validators.required],
    });
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params=>{
      this.schemeId = params['schemeId']

    });

    this.getScheme();
    
    
    this.enumService.getNominee().subscribe({
      next:(data:any)=>{
        this.nominees = data;
      },
      error:(err) => console.error('There was an error!', err)
    })

    this.customerId = localStorage.getItem('id');
  }

  getScheme(){
    this.planService.getScheme(this.schemeId).subscribe({
      next:(data:any)=>{
        this.scheme = data;

        this.newPolicyForm.get('totalAmount')?.setValidators([
          Validators.required,
          Validators.min(data.minAmount),
          Validators.max(data.maxAmount)
        ]);
    
        this.newPolicyForm.get('durationInMonths')?.setValidators([
          Validators.required,
          Validators.min(data.minDuration),
          Validators.max(data.maxDuration)
        ]);
    
        // Update validity after setting validators
        this.newPolicyForm.get('totalAmount')?.updateValueAndValidity();
        this.newPolicyForm.get('durationInMonths')?.updateValueAndValidity();
      
      },
      error:(err) => console.error('There was an error!', err)
    })
    
  }

  onSubmit(){
    this.newPolicyForm.patchValue({
      customerId : localStorage.getItem('id'),
      policyId : this.schemeId,
    })
    console.log(this.newPolicyForm.value);
    this.customerService.buyPolicy(this.newPolicyForm.value).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.router.navigate(['customer-dashboard/add-documents'], {queryParams:{ id: data.accountId, documents: this.scheme.documents}});
      },
      error:(err) => console.error('There was an error!', err)
    })

  }
  


}
