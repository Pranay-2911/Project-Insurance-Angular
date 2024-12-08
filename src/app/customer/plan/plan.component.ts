import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  selectedPlanSchemes: any[] = [];
  selectedScheme: any | null = null;

  constructor(private router: Router, private planService: PlanService) {}

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
}
