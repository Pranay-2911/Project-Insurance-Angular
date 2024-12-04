import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent {
  constructor(private route: ActivatedRoute, private adminService:AdminService, private router: Router){}

  newState = new FormGroup({
    stateName: new FormControl(),
    cityName: new FormControl()
  })
    
  addNewState()
  {
    console.log(this.newState.value);
    
      this.adminService.addState(this.newState.value).subscribe((data) =>{
        alert('State Added successfully');
        this.newState.reset();
      });
  };
  }

