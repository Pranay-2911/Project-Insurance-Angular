import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {

  agents : any;
  page = 1;
  pageSize = 5;
  totalAgents = 0;
  filteredAgents: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 

  constructor(private router: Router, private adminService: AdminService) {}
  ngOnInit(){
    this.getAllAgents();

  }

  filterDocuments() {
    const query = this.searchQuery.toLowerCase();
    this.filteredAgents = this.agents.filter((item:any) =>
      item.firstName.toLowerCase().includes(query)
    );
  }

  getAllAgents(){
    this.adminService.getUnverifiedAgents(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.agents = data;
        this.filteredAgents = this.agents;;
        console.log(this.agents);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  verifyAgent(id: any) {
    this.adminService.verifyAgent(id).subscribe(
      (data) => {
        console.log('Agent verified:', data);
        alert('Agent verified successfully!');
        this.router.navigate(['admin-dashboard/tabs']);
      },
      (error) => {
        console.error('Error verifying agent:', error);
        alert('Failed to verify the agent. Please check the logs.');
      }
    );
  }
  
  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllAgents();
  }
 




  // newAgentForm = new FormGroup({
  //   firstName: new FormControl(),
  //   lastName: new FormControl(),
  //   qualification: new FormControl(),
  // getAllAgentsormControl(),
  //   mobileNumber: new FormControl(),
  //   username: new FormControl(),
  //   password: new FormControl()

  // });

  // constructor(private adminService: AdminService) {}

  // addAgent()
  // {
  //   this.adminService.addAgent(this.newAgentForm.value).subscribe((data) =>{
  //     console.log(data);
  //     this.newAgentForm.reset();
  //   });
  // }

}
