import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { StateCityService } from 'src/app/services/state-city.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {
  constructor(private route: ActivatedRoute, private adminService:AdminService, private stateCityService: StateCityService){}
  states:any='';
  cities:any;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  ngOnInit() {
    this.stateCityService.getState().subscribe({
      next: (data:any) => {
        this.states = data;
        console.log(this.states);        
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  }

  newCity = new FormGroup({
    stateName: new FormControl('',[Validators.required]),  
    cityName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'),])
  });
  
  // cityNameValidator(control: FormControl): { [key: string]: boolean } | null {
  //   const cityName = control.value;
  //   if (this.cities.includes(cityName)) {
  //     return { cityNameNotUnique: true }; // Custom error if the city name already exists
  //   }
  //   return null;
  // }
 
  addNewCity()
  {
    console.log(this.newCity.value);
      this.stateCityService.addCity(this.newCity.value).subscribe({
        next:(data:any)=>{
          this.newCity.reset();
        this.showNotification('City added successfully!', 'success');
        },
        error: (error:any) => {
          console.log(error);
          this.showNotification(error.exceptionMessage, 'error');

        }
      })
        
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
