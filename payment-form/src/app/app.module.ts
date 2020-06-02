import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { InputComponent } from './input/input.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [AppComponent, PaymentFormComponent, InputComponent, CardComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
