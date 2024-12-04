import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {
  constructor(private route: ActivatedRoute, private adminService:AdminService){}
  state:any='';
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.state = params['name'];
      console.log(this.state);
    });

    this.newCity.patchValue({
      stateName: this.state,
      cityName: ''  
     });
    
  }

  newCity = new FormGroup({
    stateName: new FormControl(),  
    cityName: new FormControl()
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
