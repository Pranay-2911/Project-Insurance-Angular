import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-schema',
  templateUrl: './view-schema.component.html',
  styleUrls: ['./view-schema.component.css']
})
export class ViewSchemaComponent {
schemes :any;

 constructor(private adminService: AdminService){}

 ngOnInit(){
  this.adminService.getScheme().subscribe({
      next: (data) => {
        this.schemes = data;
        console.log(this.schemes);
      },
      error: (error) => {
        console.log(error);
      }
    });
 }


}
