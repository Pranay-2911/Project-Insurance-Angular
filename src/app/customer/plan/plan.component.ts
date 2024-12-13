import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { EmailService } from 'src/app/services/email.service';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  plansData: any = [];
  selectedPlanId: string | null = null;
  selectedSchemeId: string | null = null;

  emails: string[] = ['pranayraut129@gmail.com', 'pranayraut2129@gmail.com'];
  customerName: any;
  customerMob: any;
  customerData: any;
  totalInstallments:any;
  selectedPlanSchemes: any[] = [];
  selectedScheme: any | null = null;

  calculator = {
    totalAmount: 0,
    duration: 0,
    installmentType: '', // Added installment type
    monthlyPremium: null as number | null,
  };

  installmentTypes = [
    { label: 'Monthly', value: 12 },
    { label: 'Quarterly', value: 3 },
    { label: 'Yearly', value: 1 },
  ];

  premiumForm = new FormGroup({
    totalAmount: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]),
    duration: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]),
    installmentType: new FormControl('', Validators.required),
  })
  constructor(
    private router: Router,
    private planService: PlanService,
    private emailService: EmailService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.planService.getAllPlans().subscribe({
      next: (data) => {
        this.plansData = data || [];
        console.log('Fetched Plans:', this.plansData);
      },
      error: (error) => {
        console.error('Error fetching plans:', error);
      },
    });

    this.customerService.getCustomer(localStorage.getItem('id')).subscribe({
      next: (data) => {
        this.customerData = data;
      },
      error: (error) => {
        console.error('Error fetching customer data:', error);
      },
    });
  }

  isEligible: boolean = true;
  eligibilityMessage: string = '';

  checkEligibility() {
    const customerDOB = new Date(this.customerData.dateOfBirth);
    const currentDate = new Date();
    const customerAge = currentDate.getFullYear() - customerDOB.getFullYear();
    const isBirthdayPassed =
      currentDate.getMonth() > customerDOB.getMonth() ||
      (currentDate.getMonth() === customerDOB.getMonth() &&
        currentDate.getDate() >= customerDOB.getDate());

    const actualAge = isBirthdayPassed ? customerAge : customerAge - 1;

    if (actualAge < this.selectedScheme.minAge || actualAge > this.selectedScheme.maxAge) {
      this.isEligible = false;
      this.eligibilityMessage = `You are not eligible to buy this policy. Age requirement: ${this.selectedScheme.minAge}-${this.selectedScheme.maxAge} years.`;
    } else {
      this.isEligible = true;
      this.eligibilityMessage = '';
    }
  }

  onPlanSelect(): void {
    const selectedPlan = this.plansData.find((plan: any) => plan.id === this.selectedPlanId);
    this.selectedPlanSchemes = selectedPlan?.schemes || [];
    this.selectedSchemeId = null;
    this.selectedScheme = null;
    console.log('Selected Plan:', selectedPlan);
    console.log('Available Schemes:', this.selectedPlanSchemes);
  }

  onSchemeSelect(): void {
    this.selectedScheme = this.selectedPlanSchemes.find((scheme: any) => scheme.id === this.selectedSchemeId);
    console.log('Selected Scheme:', this.selectedScheme);
    this.checkEligibility();
  }

  buyScheme(schemeId: string): void {
    console.log('Buying scheme with ID:', schemeId);
    this.router.navigate(['customer-dashboard/buy-policy'], { queryParams: { schemeId } });
  }

  calculatePremium(): void {
    const { totalAmount, duration, installmentType } = this.calculator;

    if (totalAmount > 0 && duration > 0 && installmentType) {
      this.totalInstallments = duration * Number(installmentType); // Convert to number
      this.calculator.monthlyPremium = totalAmount / this.totalInstallments;

      console.log('Calculated Premium:', this.calculator.monthlyPremium);

      this.customerService.getInfo(localStorage.getItem('id')).subscribe({
        next: (data: any) => {
          this.customerName = data.name;
          this.customerMob = data.mobileNumber;

          this.emailService.sendEmailAgent(
            this.emails,
            'Customer Interested in Policy - Quotation Calculated',
            `Dear Agent,

            A customer has shown interest in our policy and has calculated a quotation. Below are the customer details:

            Customer Name: ${data.name}
            Mobile Number: ${data.mobileNumber}
            Policy Name: ${this.selectedScheme.title}

            Please reach out to the customer promptly to assist them further.

            Best regards,
            Monocept`
          ).subscribe({
            next: () => console.log('Email sent successfully!'),
            error: (err) => console.error('Error sending email:', err),
          });
        },
        error: (error) => {
          console.error('Error fetching customer data:', error);
        },
      });
    } else {
      console.error('Invalid input for calculator');
      this.calculator.monthlyPremium = null;
    }
  }
}
