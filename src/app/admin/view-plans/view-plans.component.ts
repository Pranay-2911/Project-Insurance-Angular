import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PlanService } from 'src/app/services/plan.service';
@Component({
  selector: 'app-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrls: ['./view-plans.component.css']
})
export class ViewPlansComponent {
  plansData: any;
  selectedPlanId: any ;
  index:number= 0;
  schemeIndex:number= 0;

  constructor(private router: Router, private adminService: AdminService, private planService: PlanService) {}
  ngOnInit() {
    this.adminService.getPlan().subscribe({
      next: (data) => {
        this.plansData = data;
        console.log(this.plansData);
      },
      error: (error) => {
        console.log(error);
      }
    } );
     
  }

  AddSchema(id : any)
  {
    this.router.navigate(['admin-dashboard/schemas'], { queryParams: {id: id} });
  }
  updateSchemma(id : any)
  {
      this.router.navigate(['admin-dashboard/update-schema'], { queryParams: {id: id} });
  }
  
  updateIndex(i:any){
    if(i<0 ){
      return
    }
    if(i>this.plansData.length){
      return
    }
    this.index = i;
  }

  updateSchemeIndex(i:any){
    if(i>this.plansData[this.index].schemes.length-1){
      return
    }
    this.schemeIndex = i;
  }
}
