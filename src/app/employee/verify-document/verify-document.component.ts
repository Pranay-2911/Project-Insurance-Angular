import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-verify-document',
  templateUrl: './verify-document.component.html',
  styleUrls: ['./verify-document.component.css']
})
export class VerifyDocumentComponent {
  searchQuery: string = '';
  documents: any[] = [];
  filteredDocuments: any[] = [];
  totalDocuments: number = 0;
  page: number = 1;
  pageSize: number = 5;

  isImageModalOpen = false;
  selectedImage = '';

  constructor(private employeeService: EmployeeService, private emailService: EmailService) {}

  ngOnInit() {
    this.getAllDocuments();
  }

  getAllDocuments() {
    this.employeeService.getDocument(this.page, this.pageSize, this.searchQuery).subscribe({
      next: (response: any) => {
        console.log(response);
        this.documents = response.documents.map((doc: any) => ({
          ...doc,
          rejecting: false,
          rejectionReason: '',
          documents: doc.documents
        }));
        this.filteredDocuments = this.documents;
        this.totalDocuments = response.count;
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
      }
    });
  }

  filterDocuments() {
    this.page = 1;
    this.getAllDocuments();
    // const query = this.searchQuery.toLowerCase();
    // this.filteredDocuments = this.documents.filter((doc: any) =>
    //   doc.customerName.toLowerCase().includes(query)
    // );
  }

  openRejectBox(customer: any) {
    customer.rejecting = true;
  }

  submitRejection(policyAccountId: string, customer: any) {
    if (customer.rejectionReason.trim() === '') {
      alert('Rejection reason cannot be empty.');
      return;
    }

    this.employeeService.rejectDocument(policyAccountId).subscribe({
      next: () => {
        alert('All documents for the customer have been rejected successfully!');
        this.sendRejectionEmail(customer.rejectionReason);
        customer.rejecting = false;
        this.getAllDocuments();
      },
      error: (error) => {
        console.error('Error rejecting documents:', error);
      }
    });
  }

  sendRejectionEmail(reason: string) {
    const emailBody = 
      'Hello,\n\n' +
      'We regret to inform you that all your document verification requests have been rejected due to the following reason:\n' +
      `${reason}\n\n` +
      'Please review the details and resubmit your documents for verification.\n\n' +
      'Thank you,\n' +
      'MONOCEPT';

    // Use sendEmail service to send the rejection email
    this.emailService.sendEmail('pranayraut129@gmail.com', 'Document Rejection Notification', emailBody).subscribe({
      next: () => console.log('Rejection email sent successfully!'),
      error: (error) => console.error('Error sending rejection email:', error)
    });
}


  approveAllDocuments(policyAccountId: string) {
    this.employeeService.verifyDocument(policyAccountId).subscribe({
      next: () => {
        alert('Documents approved successfully!');
        this.getAllDocuments();
      },
      error: (error) => {
        console.error('Error approving documents:', error);
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllDocuments();
  }

  openImageModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.isImageModalOpen = true;
  }

  // Close the image modal
  closeImageModal() {
    this.isImageModalOpen = false;
    this.selectedImage = '';
  }
}
