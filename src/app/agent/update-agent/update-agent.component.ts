import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent {

   agent: any ; // Use `any` type

  
    newAgentForm = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      mobileNumber: new FormControl(),
      qualification: new FormControl(),
    });
  
    constructor(
      private agentService: AgentService,
      private router: Router
    ) {}
  
    ngOnInit() {
      const id = localStorage.getItem('id');
  
      // Fetch customer details
      this.agentService.getAgent(id).subscribe({
        next: (data) => {
          this.agent = data; // Assign the response to `customer`
          this.newAgentForm.patchValue(data);
        },
        error: (error) => console.log(error)
      });
    }
  
  
    onUpdate() {
      console.log(this.newAgentForm.value);
      this.agentService.updateAgent(this.newAgentForm.value).subscribe({
        next: (data) => {
          console.log(data);
          window.alert('Agent profile updated successfully!');
        },
        error: (error) => console.log(error)
      });
    }
}
