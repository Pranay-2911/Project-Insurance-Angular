import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import {planNameValidator} from 'src/app/validators/custom-validators'
@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent {
  existingPlans : any
  newPlanForm = new FormGroup({
    name: new FormControl('', [Validators.required,])
  });

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getPlan().subscribe((plans: any) => {
      this.existingPlans = plans// Assuming plan objects have a 'name' property
    });
  }
  addNewPlan()
  {
      this.adminService.addPlan(this.newPlanForm.value).subscribe((data) =>{
        console.log(data);
        this.newPlanForm.reset();
      });
  };

}
