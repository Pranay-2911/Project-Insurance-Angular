import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
//   userName: string='';
//   constructor(private route: ActivatedRoute){}
//   ngOnInit() {
//     this.route.queryParams.subscribe((params) => {
//       console.log(params['userName']);
//       this.userName=params['userName'];
//     });
// }
constructor(private router: Router){}

@Input() userName!: string;

logOut(){
  localStorage.removeItem('token');
  this.userName='';
  this.router.navigate(['']);

}
}
