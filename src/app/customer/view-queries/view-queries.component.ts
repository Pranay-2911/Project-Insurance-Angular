import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { QueryService } from 'src/app/services/query.service';
@Component({
  selector: 'app-view-queries',
  templateUrl: './view-queries.component.html',
  styleUrls: ['./view-queries.component.css']
})
export class ViewQueriesComponent {
  constructor(private route: ActivatedRoute, private queryService: QueryService, private router: Router){}
   queries:any;
   page = 1;
   pageSize = 5;
   totalQueries =0;
   searchQuery ='';


  ngOnInit() {

    this.getQueries();
  }

  getQueries(){
    this.queryService.getQueries(localStorage.getItem('id'), this.page, this.pageSize, this.searchQuery).subscribe({
      next: (data:any) => {
        this.queries = data.queryDto;
        this.totalQueries = data.count;
        console.log(this.queries);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  filterDocuments(){
    this.page = 1;
    this.getQueries();
  }
  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getQueries();
  }
}
