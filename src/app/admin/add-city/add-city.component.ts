import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {
  constructor(private route: ActivatedRoute, private adminService:AdminService){}
  states:any='';
  
  ngOnInit() {
    this.adminService.getState().subscribe({
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
    stateName: new FormControl('',Validators.required),  
    cityName: new FormControl('', Validators.required)
  });
  
  addNewCity()
  {
    console.log(this.newCity.value);
      this.adminService.addCity(this.newCity.value).subscribe((data) =>{
        alert('City Added successfully');
        this.newCity.reset();
      });
  };

}
