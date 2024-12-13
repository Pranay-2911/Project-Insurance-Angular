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
  nominees: any;
  customerId: any;
  scheme: any;
  newPolicyForm!: FormGroup; 

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
      policyId: [null],
      totalAmount: [null],
      durationInMonths: [null],
      nominee: [''],
      nomineeRelation: [''],
      customerId: [null],
      divider: [null],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.schemeId = params['schemeId'];
    });

    this.getScheme();

    this.enumService.getNominee().subscribe({
      next: (data: any) => {
        this.nominees = data;
      },
      error: (err) => console.error('There was an error!', err)
    });

    this.customerId = localStorage.getItem('id');
  }

  initializeForm() {
    this.newPolicyForm = this.fb.group({
      policyId: [null, Validators.required],
      totalAmount: [
        null,
        [
          Validators.required,
          Validators.min(this.scheme.minAmount),
          Validators.max(this.scheme.maxAmount)
        ]
      ],
      durationInMonths: [
        null,
        [
          Validators.required,
          Validators.min(this.scheme.minPolicyTerm),
          Validators.max(this.scheme.maxPolicyTerm)
        ]
      ],
      nominee: ['', Validators.required],
      nomineeRelation: ['', Validators.required],
      customerId: [null, Validators.required],
      divider: [null, Validators.required], // Added divider field with validation
    });
  }

  getScheme() {
    this.planService.getScheme(this.schemeId).subscribe({
      next: (data: any) => {
        this.scheme = data;
        console.log(this.scheme);

        this.initializeForm();
      },
      error: (err) => console.error('There was an error!', err)
    });
  }

  // Added method to handle changes to the installment type
  onInstallmentTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Explicitly cast as HTMLSelectElement
    const value = selectElement.value; // Now TypeScript knows `value` exists
    this.newPolicyForm.patchValue({
      divider: +value // Convert the value to a number and patch it to the form
    });
  }
  
  

  onSubmit() {
    this.newPolicyForm.patchValue({
      customerId: localStorage.getItem('id'),
      policyId: this.schemeId,
    });
    console.log(this.newPolicyForm.value);
    this.customerService.buyPolicy(this.newPolicyForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['customer-dashboard/add-documents'], {
          queryParams: { id: data.accountId, documents: this.scheme.documents }
        });
      },
      error: (err) => console.error('There was an error!', err)
    });
  }
}