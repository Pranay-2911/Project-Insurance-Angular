import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
userName: string="";
captcha: string;
  constructor(private route: ActivatedRoute){
    this.captcha = '';
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params['userName']);
      this.userName = params['userName'];
    });
}
// resolved(captchaResponse:string){
//   this.captcha = captchaResponse;
//   console.log(`Resolved captcha with response: ${captchaResponse}`);
// }
}
