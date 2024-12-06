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
  ngOnInit() {
    this.queryService.getQueries().subscribe({
      next: (data) => {
        this.queries = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
