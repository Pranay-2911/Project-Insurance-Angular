import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-view-schema',
  templateUrl: './view-schema.component.html',
  styleUrls: ['./view-schema.component.css'],
})
export class ViewSchemaComponent {
  totalItems = 0;
  schemes: any;
  filteredDocuments: any[] = [];
  searchQuery: string = '';
  page = 1;
  pageSize = 5;

  constructor(private adminService: AdminService, private planService: PlanService, private router: Router) {}

  ngOnInit() {
    this.getSchemes();
  }

  getSchemes() {
    this.adminService.getScheme(this.page, this.pageSize, this.searchQuery).subscribe({
      next: (data:any) => {
        console.log(data);
        this.schemes = data.policyDto;
        this.filteredDocuments = this.schemes;
        this.totalItems = data.count;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  filterDocuments() {
    this.page=1;
    this.getSchemes();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.schemes.filter((item: any) =>
    //   item.title.toLowerCase().includes(query)
    // );
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getSchemes();
  }

  toggleSchemeStatus(scheme: any) {
    // Toggle the policyStatus value
    scheme.policyStatus = !scheme.policyStatus;
  
    // Log the scheme to check the updated status
    console.log(scheme);
  
    // Update the scheme on the server
    this.planService.updateSchema(scheme).subscribe({
      next: () => {
        alert("Schema Updated Successfully");
        // this.router.navigate(['admin-dashboard/tabs']);
        this.getSchemes(); // Navigate if needed after update
      },
      error: (error: any) => {
        console.error('Error updating scheme:', error);
        alert("An error occurred while updating the schema. Please try again later.");
      }
      
    });
  }
}
