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
  onPlanSelect() {
    console.log("Selected Plan ID:", this.selectedPlanId);
  }
  
  getSchemesForSelectedPlan() {
    const selectedPlan = this.plansData.find((plan: any) => plan.id === this.selectedPlanId);
    return selectedPlan ? selectedPlan.schemes : [];
  }

  buyScheme(id : any) {
  }
  

}
