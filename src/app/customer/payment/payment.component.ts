import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PremiumService } from 'src/app/services/premium.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  amount: any;
  premiumId: any;
  newPayment = new FormGroup({
    amount: new FormControl({ value:'', disabled: true }),
    status: new FormControl()
  })

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  constructor(private route:ActivatedRoute, private premiumService:PremiumService, private router:Router) { }

  ngOnInit() {
    console.log(window.paypal);
    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color:  'blue',
        shape:'rect',
        label: 'pay'
      },
      createOrder: (data:any, actions:any) => {
        return actions.order.create({
          purchase_units:[{
            amount:{
              value: this.amount,
              currency_code: 'USD'
            }
          }]
        })
      },
      onApprove:(data:any, actions:any) =>{
        return actions.order.capture().then((details: any) => {
          console.log(details);
          this.onPay();
        });
      },
      onError:(error:any)=>{
        console.log(error);
        alert("Payment failed!!");
        // this.router.navigate(['customer-dashboard/pay-premium']);
      }
    }).render(this.paymentRef.nativeElement);

    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'];
      this.premiumId = params['premiumId'];
      console.log(this.amount);  // Logs the correct 'amount'
      console.log(this.premiumId);  // Logs the correct 'premiumId'

      this.newPayment.patchValue({
        amount: this.amount
      });
  });


  }

  onPay() {
    this.premiumService.pay(this.premiumId).subscribe({
      next: (response: any) => {
        console.log(response);
        alert("Payment successful!!");
        this.router.navigate(['customer-dashboard/premium']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  
}
