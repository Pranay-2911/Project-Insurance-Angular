import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent {
  agents : any;
  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.adminService.getAgent().subscribe({
      next: (data) => {
        this.agents = data;
        console.log(this.agents);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteAgent(id: any){
    this.adminService.deleteAgent(id).subscribe(()=>{});
    alert('Agent deleted successfully!');
    location.reload();
  }

}
