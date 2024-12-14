import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent {

   agent: any ; // Use `any` type
   showToast = false;
   toastMessage = '';
   toastType: 'success' | 'error' = 'success';
  
    newAgentForm = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      qualification: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
          // window.alert('Agent profile updated successfully!');
          this.showNotification("Agent Details updated successfully", 'success')
        },
        error: (error) => {
          console.log(error);
          this.showNotification("Agent with same mobile number is already exists!", 'error');
        }
      });
    }

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
