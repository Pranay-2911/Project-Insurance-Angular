import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrls: ['./view-plans.component.css']
})
export class ViewPlansComponent {
  plansData: any;
  selectedPlanId: any ;
  constructor(private router: Router, private adminService: AdminService) {}
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
  

}
