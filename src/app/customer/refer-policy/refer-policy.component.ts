import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-refer-policy',
  templateUrl: './refer-policy.component.html',
  styleUrls: ['./refer-policy.component.css']
})
export class ReferPolicyComponent {

  agentId: any;
  policyId: any;
  scheme: any;

  constructor(private route: ActivatedRoute, private planService: PlanService, private router: Router) {}

  ngOnInit()
  {
    this.route.params.subscribe(params => {
      this.agentId = params['id1'];
      this.policyId = params['id2'];

      this.planService.getScheme(this.policyId).subscribe({
        next: (data) => {
          this.scheme = data;
          console.log('Fetched Plans:', this.scheme);
        },
        error: (error) => {
          console.error('Error fetching plans:', error);
        },
      })

    });
  }

  buyScheme(id : any)
  {
      this.router.navigate(['customer-dashboard/buy-policy-agent'], {queryParams:{ schemeId : this.policyId, agentId: this.agentId}});
  }

}
