import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-withdraw-commission',
  templateUrl: './withdraw-commission.component.html',
  styleUrls: ['./withdraw-commission.component.css']
})
export class WithdrawCommissionComponent {


  requests: any;
  balance: any;
  agentId = localStorage.getItem('id');
  constructor(private route: ActivatedRoute, private agentService:AgentService, private router: Router){}

  commissonForm = new FormGroup({
    amount: new FormControl(),
    agentId: new FormControl()
  })
  ngOnInit()
  {
    this.agentService.getBalance(this.agentId).subscribe({
      next: (data) => {
        this.balance = data;
        console.log(this.balance);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.agentService.getRequests(this.agentId).subscribe({
      next: (data) => {
        this.requests = data;
        console.log(this.requests);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
    
  commissionRequest()
  {
    this.commissonForm.patchValue({ agentId: this.agentId})
    console.log(this.commissonForm.value);
    
      this.agentService.commissionRequest(this.commissonForm.value).subscribe((data) =>{
        alert('Request has been send successfully');
        this.router.navigate(['/agent-dashboard/agent-tabs']);
      });
  };



}
