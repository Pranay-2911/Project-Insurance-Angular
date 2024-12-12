import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agent-change-password',
  templateUrl: './agent-change-password.component.html',
  styleUrls: ['./agent-change-password.component.css']
})
export class AgentChangePasswordComponent {

  newForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [
      Validators.required, 
      Validators.minLength(6),  // New password should be at least 8 characters
      
    ])
  });

  constructor(private agentService: AgentService) { }
  chnagePassword(){
   
    this.agentService.changePassword(this.newForm.value).subscribe({
      next:()=>{
        alert("Your password have been change successfully")
        this.newForm.reset(); // Reset the form after adding the query
      },
      error: (error: any) => {
        console.error('Error adding query:', error);
        alert("An error occurred while adding your query. Please try again later.")
      }  // Handle any errors that occur during the subscription process
    });

}

}
