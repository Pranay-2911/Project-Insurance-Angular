import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-query-response',
  templateUrl: './query-response.component.html',
  styleUrls: ['./query-response.component.css']
})
export class QueryResponseComponent {

  newReplyForm = new FormGroup({
    reply: new FormControl(),
  });

  queries: any;
  page = 1;
  pageSize = 5;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(){
    this.getAllQueies();
  }

  getAllQueies(){
    this.employeeService.getAllQuery(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.queries = data;
        console.log(this.queries);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addReply(id: any)
  {
    console.log(this.newReplyForm.value);
    this.employeeService.queryResponse(id, this.newReplyForm.value).subscribe((data) =>{
      console.log(data);
    });
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllQueies();
  }

}