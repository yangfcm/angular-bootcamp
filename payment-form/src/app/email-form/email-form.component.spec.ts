import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EmailFormComponent } from './email-form.component';

describe('EmailFormComponent', () => {
  let component: EmailFormComponent;
  let fixture: ComponentFixture<EmailFormComponent>;
  let emailInput: DebugElement, submitBtn: DebugElement;
  let form: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailFormComponent],
      imports: [FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(EmailFormComponent);
    component = fixture.componentInstance;
    emailInput = fixture.debugElement.query(By.css('input.input'));
    form = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form and disabled submit button initally', async(() => {
    fixture.whenStable().then(() => {
      const email = component.emailForm.form.controls['email'];
      expect(email.invalid).toBeTruthy();
      expect(component.emailForm.invalid).toBeTruthy();
      fixture.detectChanges();
      submitBtn = fixture.debugElement.query(By.css('button.button'));
      expect(submitBtn.nativeElement.disabled).toBeTruthy();
    });
  }));

  it('should be able to detect invalid email, render correct error message and disable submit button', async(() => {
    fixture.whenStable().then(() => {
      emailInput.triggerEventHandler('input', {
        // Input an invalid email.
        target: {
          value: 'test#test.com',
        },
      });
      const email = component.emailForm.form.controls['email'];
      email.markAsTouched(); // Mark email control as touched
      expect(email.invalid).toBeTruthy();
      expect(component.emailForm.invalid).toBeTruthy();

      fixture.detectChanges();
      submitBtn = fixture.debugElement.query(By.css('button.button'));
      expect(submitBtn.nativeElement.disabled).toBeTruthy();

      const errorEl = fixture.debugElement.query(By.css('#email-error'));
      expect(errorEl.nativeElement.innerText).toContain(
        'Email provided is invalid'
      );
      expect(errorEl.nativeElement.innerText).not.toContain(
        'Email is required'
      );
    });
  }));

  it('should render correct error message and disable submit button if email is not provided', async(() => {
    fixture.whenStable().then(() => {
      emailInput.triggerEventHandler('input', {
        target: {
          value: '',
        },
      });
      const email = component.emailForm.form.controls['email'];
      email.markAsTouched();
      expect(email.invalid).toBeTruthy();
      expect(component.emailForm.invalid).toBeTruthy();

      fixture.detectChanges();
      submitBtn = fixture.debugElement.query(By.css('button.button'));
      expect(submitBtn.nativeElement.disabled).toBeTruthy();

      const errorEl = fixture.debugElement.query(By.css('#email-error'));
      expect(errorEl.nativeElement.innerText).not.toContain(
        'Email provided is invalid'
      );
      expect(errorEl.nativeElement.innerText).toContain('Email is required');
    });
  }));

  it('should enable submit button and no error message is valid email is provided', async(() => {
    fixture.whenStable().then(() => {
      emailInput.triggerEventHandler('input', {
        target: {
          value: 'test@test.com',
        },
      });
      const email = component.emailForm.form.controls['email'];
      email.markAsTouched();
      expect(email.valid).toBeTruthy();
      expect(component.emailForm.valid).toBeTruthy();

      fixture.detectChanges();
      submitBtn = fixture.debugElement.query(By.css('button.button'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();

      const errorEl = fixture.debugElement.query(By.css('#email-error'));
      expect(errorEl).toBeFalsy();
    });
  }));

  it('should be able to submit form with the input value', async(() => {
    fixture.whenStable().then(() => {
      component.onSubmitForm = jasmine.createSpy('onSubmitFormSpy');
      emailInput.triggerEventHandler('input', {
        target: {
          value: 'test@test.com',
        },
      });
      const email = component.emailForm.form.controls['email'];
      email.markAsTouched();
      form.triggerEventHandler('submit', null);
      expect(component.email).toBe('test@test.com');
      expect(component.onSubmitForm).toHaveBeenCalled();
    });
  }));
});
