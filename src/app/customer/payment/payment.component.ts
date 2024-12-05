import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PremiumService } from 'src/app/services/premium.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  amount: any;
  premiumId: any;
  newPayment = new FormGroup({
    amount: new FormControl(),
    status: new FormControl()
  })

  constructor(private route:ActivatedRoute, private premiumService:PremiumService, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.amount = params['amount'];
      console.log(this.amount)
    });

  }

  onPay() {
    this.premiumService.pay(this.premiumId, this.newPayment).subscribe({
      next: (response: any) => {
        console.log(response);
        alert("Payment successful!!");
        this.router.navigate(['customer-dashboard/pay-premium']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
}
