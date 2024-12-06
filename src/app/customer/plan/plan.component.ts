import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {

  plansData: any;
  selectedPlanId: any ;
  selectedSchemeId: any ;

  selectedPlanSchemes: any[] = [];
  selectedScheme: any | null = null;
  constructor(private router: Router, private planService: PlanService) {}
  ngOnInit() {
    this.planService.getAllPlans().subscribe({
      next: (data) => {
        this.plansData = data;
        console.log(this.plansData);
      },
      error: (error) => {
        console.log(error);
      }
    } );
     

  }
  onPlanSelect(): void {
    const selectedPlan = this.plansData.find((plan:any) => plan.id === +this.selectedPlanId);
    this.selectedPlanSchemes = selectedPlan ? selectedPlan.schemes : [];
    this.selectedSchemeId = null;
    this.selectedScheme = null;
  }

  onSchemeSelect(): void {
    this.selectedScheme = this.selectedPlanSchemes.find(scheme => scheme.id === +this.selectedSchemeId);
  }
  
  getSchemesForSelectedPlan() {
    const selectedPlan = this.plansData.find((plan: any) => plan.id === this.selectedPlanId);
    return selectedPlan ? selectedPlan.schemes : [];
  }

  buyScheme(schemeId: number): void {
    console.log('Buying scheme with ID:', schemeId);
    this.router.navigate(['customer-dashboard/buy-policy'], { queryParams: { schemeId: schemeId}});
  }
  

}
