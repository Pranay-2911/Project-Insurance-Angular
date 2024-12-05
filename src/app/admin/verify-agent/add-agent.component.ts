import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {

  agents : any;
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.adminService.getUnverifiedAgents().subscribe({
      next: (data) => {
        this.agents = data;
        console.log(this.agents);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
  verifyAgent(id: any) {
    this.adminService.verifyAgent(id).subscribe(
      (data) => {
        console.log('Agent verified:', data);
        alert('Agent verified successfully!');
        this.router.navigate(['admin-dashboard/tabs']);
      },
      (error) => {
        console.error('Error verifying agent:', error);
        alert('Failed to verify the agent. Please check the logs.');
      }
    );
  }
  
 




  // newAgentForm = new FormGroup({
  //   firstName: new FormControl(),
  //   lastName: new FormControl(),
  //   qualification: new FormControl(),
  //   email: new FormControl(),
  //   mobileNumber: new FormControl(),
  //   username: new FormControl(),
  //   password: new FormControl()

  // });

  // constructor(private adminService: AdminService) {}

  // addAgent()
  // {
  //   this.adminService.addAgent(this.newAgentForm.value).subscribe((data) =>{
  //     console.log(data);
  //     this.newAgentForm.reset();
  //   });
  // }

}
