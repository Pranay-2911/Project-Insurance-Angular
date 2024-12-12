import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  newEmployeeForm :FormGroup;

  constructor(private adminService: AdminService) {
    this.newEmployeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      salary: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]),
      username: new FormControl('',[ Validators.required, Validators.minLength(5)]),
      password: new FormControl('', Validators.required)
  
    });
  }

  addEmployee()
  {
    this.adminService.addEmployee(this.newEmployeeForm.value).subscribe((data) =>{
      console.log(data);
      this.newEmployeeForm.reset();
    });
  }

}
