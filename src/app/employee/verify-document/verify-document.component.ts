import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-verify-document',
  templateUrl: './verify-document.component.html',
  styleUrls: ['./verify-document.component.css']
})
export class VerifyDocumentComponent {

  page = 1;
  pageSize = 5;
  totalDocuments = 0; 
  documents: any;
  filteredDocuments: any[] = []; // For displaying the filtered data
  searchQuery: string = ''; // For capturing the user's search input

  constructor(public employeeService: EmployeeService, private router: Router){}
  ngOnInit(){
    this.getAllDocuments();
  }

  getAllDocuments(){
    this.employeeService.getDocument(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.documents = data;
        this.filteredDocuments = this.documents; // Initialize filteredDocuments
        console.log(this.documents);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterDocuments() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDocuments = this.documents.filter((item:any) =>
      item.customerName.toLowerCase().includes(query)
    );
  }

  approveAllDocuments(id:any) {
    // Logic for verifying the document
    // Example: Call the service to mark the document as verified
    console.log(id);
    this.employeeService.verifyDocument(id).subscribe({
      next: () => {
        alert('Document verified successfully!');
        // Refresh the document list or update the UI as needed
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error verifying document:', error);
      }
    });
    
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex +1;
    this.pageSize = event.pageSize;
    // this.page = page;
    this.getAllDocuments();
  }

  rejectAllDocuments(id: any)
  {
     // Logic for verifying the document
    // Example: Call the service to mark the document as verified
    console.log(id);
    this.employeeService.rejectDocument(id).subscribe({
      next: () => {
        alert('Document verified successfully!');
        // Refresh the document list or update the UI as needed
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error verifying document:', error);
      }
    });
  }

  
  

}
