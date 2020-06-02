import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { InputComponent } from './input/input.component';
import { CardComponent } from './card/card.component';
import { EmailFormComponent } from './email-form/email-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent,
    InputComponent,
    CardComponent,
    EmailFormComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
