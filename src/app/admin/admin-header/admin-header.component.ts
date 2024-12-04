import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
@Input() userName!: string;
}
