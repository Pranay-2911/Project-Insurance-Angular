import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  newEmployeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNumber: new FormControl(null, Validators.required),
    email: new FormControl('', Validators.required),
    salary: new FormControl(null, Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });

  constructor(private adminService: AdminService) {}

  addEmployee()
  {
    this.adminService.addEmployee(this.newEmployeeForm.value).subscribe((data) =>{
      console.log(data);
      this.newEmployeeForm.reset();
    });
  }

}
