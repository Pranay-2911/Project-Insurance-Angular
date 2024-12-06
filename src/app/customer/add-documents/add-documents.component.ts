import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.css']
})
export class AddDocumentsComponent {
  file: any | null = null; 
  documentTypes: any;

  newDocument = new FormGroup({
    name: new FormControl(),
    location: new FormControl(),
  })

  constructor(private uploadService: UploadService, private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.getDocumentType().subscribe({
      next: (types) => {
        console.log(types);
        this.documentTypes = types;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSelect(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      // Validate file size
      if (selectedFile.size > maxSize) {
        alert('File size exceeds 5 MB');
        return;
      }

      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        alert('Invalid file type. Only JPEG and PNG are allowed.');
        return;
      }

      this.file = selectedFile; // Assign valid file
    }
  }

  onRemove() {
    this.file = null;
  }

  upload() {
    if (!this.file) {
      alert("Please select a file to upload");
      return;
    }

    const data = new FormData();
    data.append('file', this.file);
    data.append('upload_preset', 'documents');

    this.uploadService.uploadImage(data).subscribe({
      next: (res: any) => {
        console.log(res);

        // Now, update the form with the location after successful upload
        this.newDocument.patchValue({
          location: res.url, // Assuming the URL of the uploaded image is in res.url
        });

        // Proceed to submit the form after setting the location
        this.addNewDocument();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  addNewDocument() {
    console.log(this.newDocument.value);

    this.documentService.addDocument(this.newDocument.value).subscribe({
      next: () => {
        alert("Document added successfully");
        this.newDocument.reset();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
