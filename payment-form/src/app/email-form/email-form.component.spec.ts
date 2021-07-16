import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
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

  it('should have invalid form and disabled submit button', async(() => {
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
});
