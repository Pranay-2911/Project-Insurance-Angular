import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service'
import { ActivatedRoute, Router } from '@angular/router';
import { StateCityService } from 'src/app/services/state-city.service';

@Component({
  selector: 'app-add-state-city',
  templateUrl: './add-state-city.component.html',
  styleUrls: ['./add-state-city.component.css']
})
export class AddStateCityComponent {
  state:any=''
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router, private stateCityService: StateCityService) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.state = params['name'];
      this.newCity.patchValue({
        stateName: this.state
      })
    })
  }
  newCity = new FormGroup({
    stateName: new FormControl(this.state, Validators.required),  
    cityName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')])
  });

  addNewCity()
  {
    console.log(this.newCity.value);
      this.stateCityService.addCity(this.newCity.value).subscribe({
        next: (data:any) => {
          this.showNotification('City added successfully!', 'success');
          this.router.navigate(['admin-dashboard/tabs']);
        },
        error: (error) => {
          this.showNotification("City already exist", 'error');
        }
      });
  }

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
