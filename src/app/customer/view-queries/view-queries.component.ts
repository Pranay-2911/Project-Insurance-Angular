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
   
  ngOnInit() {

    this.getQueries();
  }

  getQueries(){
    this.queryService.getQueries(localStorage.getItem('id'), this.page, this.pageSize).subscribe({
      next: (data) => {
        this.queries = data;
        console.log(this.queries);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getQueries();
  }
}
