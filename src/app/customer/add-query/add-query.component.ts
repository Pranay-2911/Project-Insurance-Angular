import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-add-query',
  templateUrl: './add-query.component.html',
  styleUrls: ['./add-query.component.css']
})
export class AddQueryComponent {

  newQueryForm = new FormGroup({
    title: new FormControl(),
    message: new FormControl(),
    customerId: new FormControl(),
  });

  constructor(private queryService: QueryService) { }
  addQuery(){
    this.newQueryForm.patchValue({
      customerId: localStorage.getItem('id')
    })
    console.log(this.newQueryForm.value);
    this.queryService.addQuery(this.newQueryForm.value).subscribe({
      next:()=>{
        alert("Your query has been uploaded successfully")
        this.newQueryForm.reset(); // Reset the form after adding the query
      },
      error: (error: any) => {
        console.error('Error adding query:', error);
        alert("An error occurred while adding your query. Please try again later.")
      }  // Handle any errors that occur during the subscription process
    }); // Send the new query to the server for storage
   
  }
}
