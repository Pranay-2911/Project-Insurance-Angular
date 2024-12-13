import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

interface City {
  id: string;
  name: string;
  status: boolean;
}

interface State {
  id: string;
  name: string;
  cities: City[];
  showCities?: boolean; // Optional property to control visibility of cities
}

@Component({
  selector: 'app-view-states',
  templateUrl: './view-states.component.html',
  styleUrls: ['./view-states.component.css']
})
export class ViewStatesComponent {
  states: any; // Type the states array with State[]
  
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminService.getState().subscribe({
      next: (data) => {
        this.states = data;
        this.states.forEach((state: State) => {
          state.showCities = false; // Initially hide cities
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  toggleCities(state: State) {
    state.showCities = !state.showCities; // Toggle the visibility of cities for the state
  }

  addCities(name: string) {
    // Navigate to the 'add-state-city' page with the state's name as a query parameter
    this.router.navigate(['admin-dashboard/add-state-city'], { queryParams: { name: name } });
  }

  addState() {
    this.router.navigate(['admin-dashboard/add-state']);
  }
}
