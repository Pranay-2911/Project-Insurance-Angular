import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent {
  constructor(private route: ActivatedRoute, private adminService:AdminService, private router: Router){}

  newState = new FormGroup({
    stateName: new FormControl('', [Validators.required]),
    cityName: new FormControl('', [Validators.required])
  })
    
  
  addNewState()
  {
    console.log(this.newState.value);
    
      this.adminService.addState(this.newState.value).subscribe((data) =>{
        alert('State Added successfully');
        this.newState.reset();
      });
  };

  stateNameValidator() {
    return (control: FormControl) => {
      const stateName = control.value;
      if (stateName && !/^[A-Za-z\s]+$/.test(stateName)) {
        return { invalidStateName: true };
      }
      return null;
    };
  }

  // Custom validator to check if the city name contains only alphabets
  cityNameValidator() {
    return (control: FormControl) => {
      const cityName = control.value;
      if (cityName && !/^[A-Za-z\s]+$/.test(cityName)) {
        return { invalidCityName: true };
      }
      return null;
    };
  }

  }

