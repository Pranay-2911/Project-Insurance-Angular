import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-withdraw-commission',
  templateUrl: './withdraw-commission.component.html',
  styleUrls: ['./withdraw-commission.component.css']
})
export class WithdrawCommissionComponent {

  page = 1;
  pageSize = 5;
  totalCommissions = 0;
  requests: any;
  balance: any;
  agentId = localStorage.getItem('id');
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
  selectedCommissionType: string = '';

  constructor(private route: ActivatedRoute, private agentService:AgentService, private router: Router){}

  commissonForm = new FormGroup({
    amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    agentId: new FormControl()
  })
  ngOnInit()
  {
    this.agentService.getBalance(this.agentId).subscribe({
      next: (data) => {
        this.balance = data;
        console.log(this.balance);

        this.commissonForm.get('amount')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(this.balance)
        ]);
        this.commissonForm.get('amount')?.updateValueAndValidity();
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.getAllRequests();
  }
    
  getAllRequests(){
    this.agentService.getRequests(this.agentId,this.page, this.pageSize, this.selectedCommissionType).subscribe({
      next: (data:any) => {
        this.requests = data.requests;
        this.filteredDocuments = this.requests;
        this.totalCommissions = data.count;
        console.log(this.requests);

       
        this.commissonForm.get('amount')?.updateValueAndValidity();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    this.page = 1;
    this.getAllRequests();
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

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllRequests();
  }

  

}
