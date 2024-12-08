import { Component } from '@angular/core';
import { FormGroup,FormControl,FormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-gloabal-variable',
  templateUrl: './gloabal-variable.component.html',
  styleUrls: ['./gloabal-variable.component.css']
})
export class GloabalVariableComponent {

  newGlobalForm = new FormGroup({
    commissionWithdrawDeduction: new FormControl(),
    policyCancellationPenalty: new FormControl()
  })

  constructor(){}
  updateVariable(){

  }
}
