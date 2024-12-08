import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-schema',
  templateUrl: './view-schema.component.html',
  styleUrls: ['./view-schema.component.css']
})
export class ViewSchemaComponent {
schemes :any;
page = 1;
pageSize =5;
filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; 
 constructor(private adminService: AdminService){}

 ngOnInit(){
  this.getSchemes();
 }

 getSchemes(){
  this.adminService.getScheme(this.page, this.pageSize).subscribe({
    next: (data) => {
      this.schemes = data;
      this.filteredDocuments = this.schemes;
      console.log(this.schemes);
    },
    error: (error) => {
      console.log(error);
    }
  });
 }

 filterDocuments() {
  const query = this.searchQuery.toLowerCase();
  this.filteredDocuments = this.schemes.filter((item:any) =>
    item.title.toLowerCase().includes(query)
  );
}

 onPageChange(event: any) {
  console.log(event);
  this.page = event.pageIndex +1;
  this.pageSize = event.pageSize;
  // this.page = page;
  this.getSchemes();
}

}
