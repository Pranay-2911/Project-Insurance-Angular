import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-emp-add-agent',
  templateUrl: './emp-add-agent.component.html',
  styleUrls: ['./emp-add-agent.component.css']
})
export class EmpAddAgentComponent {

  newAgentForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    qualification: new FormControl(),
    email: new FormControl(),
    mobileNumber: new FormControl(),
    username: new FormControl(),
    password: new FormControl()

  });

  constructor(private adminService: AdminService) {}

  addAgent()
  {
    this.adminService.addAgent(this.newAgentForm.value).subscribe((data) =>{
      console.log(data);
      this.newAgentForm.reset();
    });
  }


}
