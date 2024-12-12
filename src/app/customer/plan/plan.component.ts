 import { Component, OnInit } from '@angular/core';
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
  plansData: any; // Ensure it's initialized as an array
  selectedPlanId: string | null = null;
  selectedSchemeId: string | null = null;

  emails: string[] = [ 'pranayraut129@gmail.com', 'pranayraut2129@gmail.com'];
  customerName: any;
  customerMob: any;

  selectedPlanSchemes: any[] = [];
  selectedScheme: any | null = null;

  calculator = {
    totalAmount: 0,
    duration: 0,
    monthlyPremium: null as number | null,
  };

  constructor(private router: Router, private planService: PlanService, private emailService: EmailService, private customerService: CustomerService) {}

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
  }

  buyScheme(schemeId: string): void {
    console.log('Buying scheme with ID:', schemeId);
    this.router.navigate(['customer-dashboard/buy-policy'], { queryParams: { schemeId } });
  }

  calculatePremium(): void {
    if (this.calculator.totalAmount > 0 && this.calculator.duration > 0) {
      this.calculator.monthlyPremium = this.calculator.totalAmount / this.calculator.duration;

    } else {
      console.error('Invalid input for calculator');
      this.calculator.monthlyPremium = null;
    }
  }
}
