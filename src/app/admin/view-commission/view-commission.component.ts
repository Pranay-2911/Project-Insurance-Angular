import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-commission',
  templateUrl: './view-commission.component.html',
  styleUrls: ['./view-commission.component.css']
})
export class ViewCommissionComponent {

  commissions : any;
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.adminService.getCommissions().subscribe({
      next: (data) => {
        this.commissions = data;
        console.log(this.commissions);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  


}
