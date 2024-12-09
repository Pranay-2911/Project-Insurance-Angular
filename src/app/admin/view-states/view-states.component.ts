import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-states',
  templateUrl: './view-states.component.html',
  styleUrls: ['./view-states.component.css']
})
export class ViewStatesComponent {
  constructor(private route: ActivatedRoute, private adminService:AdminService, private router: Router){}
  states:any;
  stateId: any;
  ngOnInit() {
    this.adminService.getState().subscribe({
      next: (data) => {
        this.states = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  addCities(name:any) {
    // this.stateId = this.route.snapshot.paramMap.get('id');
    console.log(name);
    this.router.navigate(['admin-dashboard/add-state-city'], {queryParams:{name:name}});

  }
  addState(){
    this.router.navigate(['admin-dashboard/add-state']);
  }
}
