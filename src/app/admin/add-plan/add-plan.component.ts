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
  existingPlans : any;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  newPlanForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getPlan().subscribe((plans: any) => {
      this.existingPlans = plans// Assuming plan objects have a 'name' property
    });
  }
  addNewPlan()
  {
      this.adminService.addPlan(this.newPlanForm.value).subscribe({
        next: () => {
          this.showNotification('Plan added successfully!', 'success');
          this.newPlanForm.reset();
        },
        error: (error) => {
          this.showNotification('Plan with same name already exist!', 'error');
        }
      });
  };

  showNotification(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Hide toast after 3 seconds
  }

  hideToast() {
    this.showToast = false;
  }
}
