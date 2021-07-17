import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { PaymentFormComponent } from './payment-form.component';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let form: DebugElement,
    nameInput: DebugElement,
    cardNumberInput: DebugElement,
    expirationInput: DebugElement,
    securityCodeInput: DebugElement,
    submitBtn: DebugElement,
    resetBtn: DebugElement;

  function setupPaymentForm(form: FormGroup) {
    const { name, cardNumber, expiration, securityCode } = form.controls;
    name.setValue('John Doe');
    cardNumber.setValue('1234567890123456');
    expiration.setValue('12/23');
    securityCode.setValue('123');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));
    [nameInput, cardNumberInput, expirationInput, securityCodeInput] =
      fixture.debugElement.queryAll(By.css('app-input'));
    [submitBtn, resetBtn] = fixture.debugElement.queryAll(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form and inputs', () => {
    expect(nameInput).toBeTruthy();
    expect(cardNumberInput).toBeTruthy();
    expect(expirationInput).toBeTruthy();
    expect(securityCodeInput).toBeTruthy();
    expect(submitBtn).toBeTruthy();
    expect(resetBtn).toBeTruthy();
  });

  it('should handle the input of name', () => {
    const nameControl = component.paymentForm.controls.name;
    nameControl.setValue('');
    expect(nameControl.hasError('required')).toBeTruthy();

    nameControl.setValue('John Doe');
    expect(nameControl.hasError('required')).toBeFalsy();
    expect(nameControl.valid).toBeTruthy();
    expect(nameControl.errors).toBeFalsy();
  });

  it('should handle the input of card number', () => {
    const cardNumberControl = component.paymentForm.controls.cardNumber;
    cardNumberControl.setValue('');
    expect(cardNumberControl.hasError('required')).toBeTruthy();

    cardNumberControl.setValue('12345');
    expect(cardNumberControl.hasError('pattern')).toBeTruthy();

    cardNumberControl.setValue('1234567890123456');
    expect(cardNumberControl.valid).toBeTruthy();
    expect(cardNumberControl.errors).toBeFalsy();
  });

  it('should handle the input of date format', () => {
    const expirationControl = component.paymentForm.controls.expiration;
    expirationControl.setValue('');
    expect(expirationControl.hasError('required')).toBeTruthy();

    expirationControl.setValue('13/23');
    expect(expirationControl.hasError('pattern')).toBeTruthy();

    expirationControl.setValue('12/23');
    expect(expirationControl.valid).toBeTruthy();
    expect(expirationControl.errors).toBeFalsy();
  });

  it('should handle the input of security code', () => {
    const securityCodeControl = component.paymentForm.controls.securityCode;
    securityCodeControl.setValue('');
    expect(securityCodeControl.hasError('required')).toBeTruthy();

    securityCodeControl.setValue('01');
    expect(securityCodeControl.hasError('pattern')).toBeTruthy();

    securityCodeControl.setValue('123');
    expect(securityCodeControl.valid).toBeTruthy();
    expect(securityCodeControl.errors).toBeFalsy();
  });

  it('should submit form on correct input', () => {
    expect(component.paymentForm.valid).toBeFalsy();
    setupPaymentForm(component.paymentForm);
    expect(component.paymentForm.valid).toBeTruthy();
    component.onSubmitForm = jasmine.createSpy('onSubmitFormSpy');
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(component.onSubmitForm).toHaveBeenCalled();
  });

  it('should clear input on resetting form', () => {
    setupPaymentForm(component.paymentForm);
    expect(component.paymentForm.valid).toBeTruthy();
    resetBtn.triggerEventHandler('click', null);
    expect(component.paymentForm.controls.name.value).toBeFalsy();
    expect(component.paymentForm.controls.cardNumber.value).toBeFalsy();
    expect(component.paymentForm.controls.expiration.value).toBeFalsy();
    expect(component.paymentForm.controls.securityCode.value).toBeFalsy();
    expect(component.paymentForm.valid).toBeFalsy();
  });
});
