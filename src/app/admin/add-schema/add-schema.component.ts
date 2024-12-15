import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormControl,FormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { UploadService } from 'src/app/services/upload.service';
import { maxAmountValidator, maxAgeValidator, maxPolicyTermValidator } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-add-schema',
  templateUrl: './add-schema.component.html',
  styleUrls: ['./add-schema.component.css']
})
export class AddSchemaComponent {
  file:any;
  id: any = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  newSchemaForm: FormGroup;
  documentsList = ['Adhar Card', 'Pan Card', 'Driving License', 'Health Report'];



  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router, private uploadService:UploadService, private fb: FormBuilder) { 
    this.newSchemaForm = this.fb.group({
      planId:['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      minAmount: ['', [Validators.required, Validators.min(1)]],
      maxAmount: ['', [Validators.required, Validators.min(1), maxAmountValidator()]],
      minAge: ['', [Validators.required, Validators.min(18), Validators.max(50)]],
      maxAge: ['', [Validators.required, Validators.max(70), maxAgeValidator()]],
      minPolicyTerm: ['', [Validators.required, Validators.min(1)]],
      maxPolicyTerm: ['', [Validators.required,  Validators.min(1), maxPolicyTermValidator()]],
      policyRatio: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      policyStatus: [false],
      registrationCommisionAmount: ['', [Validators.required, Validators.min(1)]],
      installmentCommisionRatio: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      documents: this.fb.array([]), // FormArray for checkboxes
      imageLink: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params =>{


      this.id = params['id'];
      console.log(this.id);
    }
    )}

    get documents(): FormArray {
      return this.newSchemaForm.get('documents') as FormArray;
    }
    
    onCheckboxChange(event: Event): void {
      const checkbox = event.target as HTMLInputElement;
      const value = checkbox.value;
  
      if (checkbox.checked) {
        this.documents.push(this.fb.control(value));
      } else {
        const index = this.documents.controls.findIndex(control => control.value === value);
        this.documents.removeAt(index);
      }
    }

    addnewSchema()
    {
      this.adminService.addScheme(this.newSchemaForm.value).subscribe({
        next: (data:any)=>{
          console.log(data);
          this.showNotification("Schema added successfully", 'success');
          this.newSchemaForm.reset();
          this.router.navigate(['/admin-dashboard/add-schemas']);
        },
        error: (err:any) => {
          console.log(err);
          this.showNotification("Schema with same name already exist", 'error');
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
          this.newSchemaForm.patchValue({
            planId: this.id,
            imageLink: res.url, // Assuming the URL of the uploaded image is in res.url
          });
          console.log(this.newSchemaForm.value);
          // Proceed to submit the form after setting the location
          this.addnewSchema();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }

    showNotification(message: string, type: 'success' | 'error') {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
  
      setTimeout(() => {
        this.showToast = false;
      }, 3000); // Hide toast after 3 seconds
    }
  
    hideToast() {
      this.showToast = false;
    }

}
