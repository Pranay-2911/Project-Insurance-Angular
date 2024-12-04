import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormControl,FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-schema',
  templateUrl: './add-schema.component.html',
  styleUrls: ['./add-schema.component.css']
})
export class AddSchemaComponent {

  plansId: any = '';

  newSchemaForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    minAmount: new FormControl(),
    maxAmount: new FormControl(),
    minAge: new FormControl(),
    maxAge: new FormControl(),
    minPolicyTerm: new FormControl(),
    maxPolicyTerm: new FormControl(),
    policyRatio: new FormControl(),
    policyStatus: new FormControl(),
    registrationCommisionAmount: new FormControl(),
    installmentCommisionRatio: new FormControl(),
    documentType: new FormControl(),
    planId: new FormControl()
    
  });

 
  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params =>{


      this.plansId = params['id'];
      console.log(this.plansId);
    }
    )}

    addnewSchema()
    {
      this.newSchemaForm.patchValue({ planId: this.plansId });
      this.adminService.addScheme(this.newSchemaForm.value).subscribe((data) =>{
        console.log(data);
        this.newSchemaForm.reset();
        this.router.navigate(['/admin-dashboard/viewplans']);
      });
    }

}
