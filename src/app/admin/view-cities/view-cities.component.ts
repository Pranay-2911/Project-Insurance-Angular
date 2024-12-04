import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-view-cities',
  templateUrl: './view-cities.component.html',
  styleUrls: ['./view-cities.component.css']
})
export class ViewCitiesComponent {
  cities:any;
  constructor(public adminService: AdminService, private router:Router){}
  ngOnInit(){
    this.adminService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addCity(){
    this.router.navigate(['admin-dashboard/add-city']);
  }
}
