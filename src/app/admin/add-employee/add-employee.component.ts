import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  newEmployeeForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    mobileNumber: new FormControl(),
    email: new FormControl(),
    salary: new FormControl(),
    username: new FormControl(),
    password: new FormControl()

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
