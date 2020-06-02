import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateFormControl } from '../date-form-control';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  paymentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/\b\d{16}\b/),
    ]),
    expiration: new DateFormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[1-2])\/\d{2}/),
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/\b\d{3}\b/),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmitForm() {}

  onResetForm() {
    this.paymentForm.reset();
  }
}
