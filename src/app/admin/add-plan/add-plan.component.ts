import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent {
  newPlanForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private adminService: AdminService) {}

  addNewPlan()
  {
      this.adminService.addPlan(this.newPlanForm.value).subscribe((data) =>{
        console.log(data);
        this.newPlanForm.reset();
      });
  };

}
