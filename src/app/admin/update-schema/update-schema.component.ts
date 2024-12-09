import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { PlanService } from 'src/app/services/plan.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-update-schema',
  templateUrl: './update-schema.component.html',
  styleUrls: ['./update-schema.component.css']
})
export class UpdateSchemaComponent implements OnInit {
  updateSchemaForm: FormGroup;
  file: any;
  schemaId: string = '';
  documentsList = ['Adhar Card', 'Pan Card', 'Driving License', 'Health Report'];
  selectedDocuments: string[] = [];

  constructor(
    private adminService: AdminService,
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private uploadService: UploadService
  ) {
    this.updateSchemaForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      minAmount: ['', Validators.required],
      maxAmount: ['', Validators.required],
      minAge: ['', Validators.required],
      maxAge: ['', Validators.required],
      minPolicyTerm: ['', Validators.required],
      maxPolicyTerm: ['', Validators.required],
      policyRatio: ['', Validators.required],
      policyStatus: [true],
      registrationCommisionAmount: ['', Validators.required],
      installmentCommisionRatio: ['', Validators.required],
      documents: this.fb.array([]),
      imageLink: ['', Validators.required],
      planId: ['']
    });
  }

 ngOnInit(): void {
  this.route.queryParams.subscribe((queryParams) => {
    this.schemaId = queryParams['id'];
    this.getSchemaDetails(this.schemaId);
    console.log(this.schemaId);
  });
}


  get documents(): FormArray {
    return this.updateSchemaForm.get('documents') as FormArray;
  }

  getSchemaDetails(id: string): void {
    this.planService.getScheme(id).subscribe((data) => {
      const schema = data as { documents: string[]; [key: string]: any }; // Type assertion
      this.updateSchemaForm.patchValue(schema); // Patch the form with the data
  
      // Set the selected documents
      this.selectedDocuments = schema.documents || [];
  
      // Update the form array with selected documents
      this.selectedDocuments.forEach(doc => {
        if (!this.documents.controls.some(control => control.value === doc)) {
          this.documents.push(this.fb.control(doc)); // Add document to form array if not already present
        }
      });
    });
  }
  
  

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
  
    if (checkbox.checked) {
      // Add selected document to form array
      this.documents.push(this.fb.control(value));
    } else {
      // Remove document from form array if unchecked
      const index = this.documents.controls.findIndex((control) => control.value === value);
      if (index !== -1) {
        this.documents.removeAt(index);
      }
    }
  }

  onSelect(event: any): void {
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
  
        this.file = selectedFile;
    }
  }

  onRemove(): void {
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
        this.updateSchemaForm.patchValue({
          imageLink: res.url, // Assuming the URL of the uploaded image is in res.url
        });
        console.log(this.updateSchemaForm.value);
        // Proceed to submit the form after setting the location
        this.onUpdateSchema();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  onUpdateSchema(): void {
    const formData = this.updateSchemaForm.value;
    console.log(formData);
    this.planService.updateSchema(formData).subscribe({
      next:()=>{
        alert("Schema Updated Successfully")
        this.router.navigate(['admin-dashboard/tabs']);// Reset the form after adding the query
      },
      error: (error: any) => {
        console.error('Error adding query:', error);
        alert("An error occurred while adding your query. Please try again later.")
      }  // Handle any errors that occur during the subscription process
    });
    
  }
}
