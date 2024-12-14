import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
  states:any;
  cities:any;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  constructor(private route: ActivatedRoute, private adminService:AdminService, private router: Router){}

  newState = new FormGroup({
    stateName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$') ]),
    cityName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$') ]),
  })
    
  ngOnInit() {
    this.adminService.getState().subscribe({
      next: (data) => {
        this.states = data;
        console.log(this.states);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })

    this.adminService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
        console.log(this.cities);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }
  
  addNewState()
  {
    console.log(this.newState.value);
    
      this.adminService.addState(this.newState.value).subscribe({
        next: (data) => {
          console.log(data);
          this.newState.reset();
          this.showNotification('State added successfully', 'success');
        },
        error: (error) => {
          console.error('Error:', error);
          this.showNotification("State or city name already exist", 'error');
        }
      });
  };

  

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

