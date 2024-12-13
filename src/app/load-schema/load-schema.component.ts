import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../services/plan.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-load-schema',
  templateUrl: './load-schema.component.html',
  styleUrls: ['./load-schema.component.css']
})
export class LoadSchemaComponent {

  newNameForm = new FormGroup({
    name: new FormControl(),
  });
  schemas : any;
  selectedSchema: any;

  planName: any;
  constructor(private route: ActivatedRoute, private planService: PlanService, private router: Router) {}

  ngOnInit() {
    
    this.route.queryParams.subscribe((params) => {
      this.planName = params['name'],
      console.log(this.planName);
      
    });

    this.newNameForm.patchValue({
      name: this.planName
    });
    console.log(this.newNameForm)


    this.planService.getSchemaByName(this.newNameForm.value).subscribe({
      next: (data: any) => {
        this.schemas = data;
        console.log(this.schemas);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  
  onSchemaSelect(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedSchema = this.schemas.find((schema: { id: string }) => schema.id === selectedId);
    console.log(this.selectedSchema);
  }
  

  redirectToBuyPolicy(schemaId: string) {
    // Logic to redirect to the Buy Policy page with the selected schema ID

    this.router.navigate(['login']);
    
  }

}
