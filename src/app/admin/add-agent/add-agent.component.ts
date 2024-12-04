import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {

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
