import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Policy } from '@mui/icons-material';
import { PlanService } from 'src/app/services/plan.service';


@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent {
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

  referPolicy(id:any){

    this.router.navigate(['agent-dashboard/refer-customers'], {queryParams : {policyId: id}});
  }
}
