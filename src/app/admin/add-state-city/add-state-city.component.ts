import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-state-city',
  templateUrl: './add-state-city.component.html',
  styleUrls: ['./add-state-city.component.css']
})
export class AddStateCityComponent {
  state:any=''
  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

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
    cityName: new FormControl('', Validators.required)
  });

  addNewCity(){
    

    console.log(this.newCity.value);
      this.adminService.addCity(this.newCity.value).subscribe((data) =>{
        alert('City Added successfully');
        this.newCity.reset();
      });
  }
}
