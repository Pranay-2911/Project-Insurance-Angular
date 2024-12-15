import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { EnumService } from 'src/app/services/enum.service';
import { PlanService } from 'src/app/services/plan.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-buy-policy-agent',
  templateUrl: './buy-policy-agent.component.html',
  styleUrls: ['./buy-policy-agent.component.css']
})
export class BuyPolicyAgentComponent {

  schemeId: any = '';
  nominees:any;
  customerId:any;
  scheme:any;
  newPolicyForm : FormGroup; 
  agentId : any;
  installmentTypes = [
    { label: 'Monthly', value: 12 },
    { label: 'Quarterly', value: 3 },
    { label: 'Yearly', value: 1 },
  ];
 
  constructor(
    private customerService: CustomerService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router,
    private enumService: EnumService,
    private planService: PlanService,
    private fb: FormBuilder
  ) {
    this.newPolicyForm = this.fb.group({
      policyId: [null, Validators.required],
      totalAmount: [null, Validators.required], // Validators will be added later
      durationInYears: [null, Validators.required], // Validators will be added later
      nominee: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      nomineeRelation: ['', Validators.required],
      agentId: ['', Validators.required],
      divider:  [null, Validators.required]
    });
  }
  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.schemeId = params['schemeId'];
      this.agentId = params['agentId'];
      this.customerId = localStorage.getItem('id');
    });
  
    this.planService.getScheme(this.schemeId).subscribe({
      next: (data: any) => {
        this.scheme = data;
  
        // Dynamically add validators after scheme is fetched
        this.newPolicyForm.get('totalAmount')?.setValidators([
          Validators.required,
          Validators.min(this.scheme.minAmount),
          Validators.max(this.scheme.maxAmount),
        ]);
        this.newPolicyForm.get('durationInYears')?.setValidators([
          Validators.required,
          Validators.min(this.scheme.minPolicyTerm),
          Validators.max(this.scheme.maxPolicyTerm),
        ]);
        this.newPolicyForm.updateValueAndValidity();
      },
      error: (err) => console.error('There was an error!', err),
    });
  
    this.enumService.getNominee().subscribe({
      next: (data: any) => {
        this.nominees = data;
      },
      error: (err) => console.error('There was an error!', err),
    });
  }
  

  onInstallmentTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Explicitly cast as HTMLSelectElement
    const value = selectElement.value; // Now TypeScript knows `value` exists
    this.newPolicyForm.patchValue({
      divider: +value // Convert the value to a number and patch it to the form
    });
  }

  onSubmit(){
    this.newPolicyForm.patchValue({
      agentId: this.agentId,
      policyId : this.schemeId,
    })
    console.log(this.newPolicyForm.value);
    this.customerService.buyPolicyByAgent(this.customerId, this.newPolicyForm.value).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.router.navigate(['customer-dashboard/add-documents'], {queryParams:{ id: data.accountId, documents: this.scheme.documents}});
      },
      error:(err) => console.error('There was an error!', err)
    })

  }

}
