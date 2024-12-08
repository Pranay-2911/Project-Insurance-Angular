import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  newGlobalForm = new FormGroup({
    commissionWithdrawDeduction: new FormControl(),
    policyCancellationPenalty: new FormControl()
  });

  getValue: any;

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getGlobalvariable().subscribe({
      next: (data) => {
        // Initialize the form with fetched values
        this.getValue = data

        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateVariable() {
    this.adminService.updateGlobalvariable(this.newGlobalForm.value).subscribe({
      next: (data) => {
        console.log(data);
        alert("Updated variable successfully");
        this.router.navigate(['admin-dashboard/tabs']);
      },
      error: (error) => {
        console.log(error);
      }

    })
    };
  }

