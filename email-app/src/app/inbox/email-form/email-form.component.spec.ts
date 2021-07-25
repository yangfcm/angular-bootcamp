import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmailFormComponent } from './email-form.component';
import { EMAIL_DATA } from '../email.service.spec';
import { By } from '@angular/platform-browser';
import { IEmail } from '../email.interface';
import { first } from 'rxjs/operators';

describe('EmailFormComponent', () => {
  let component: EmailFormComponent;
  let fixture: ComponentFixture<EmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFormComponent);
    component = fixture.componentInstance;
    component.email = EMAIL_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form, inputs and send button', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
    const inputs = fixture.debugElement.queryAll(By.css('app-input'));
    expect(inputs.length).toBe(4);
    const sendBtn = fixture.debugElement.queryAll(By.css('button.button'));
    expect(sendBtn).toBeTruthy();
  });

  it('should handle the input of to(receiver)', () => {
    const toControl = component.emailForm.controls.to;
    expect(toControl.value).toBe(EMAIL_DATA.to);
    expect(toControl.valid).toBeTruthy();
    toControl.setValue('');
    expect(toControl.hasError('required')).toBeTruthy();
    toControl.setValue('ming#test.com');
    expect(toControl.hasError('email')).toBeTruthy();
  });

  it('should disable the input of from(sender)', () => {
    const fromControl = component.emailForm.controls.from;
    expect(fromControl.value).toBe(EMAIL_DATA.from);
    expect(fromControl.disabled).toBeTruthy();
  });

  it('should handle the input of subject', () => {
    const subjectControl = component.emailForm.controls.subject;
    expect(subjectControl.value).toBe(EMAIL_DATA.subject);
    expect(subjectControl.valid).toBeTruthy();
    subjectControl.setValue('');
    expect(subjectControl.hasError('required')).toBeTruthy();
  });

  it('should handle the input of text', () => {
    const textControl = component.emailForm.controls.text;
    expect(textControl.value).toBe(EMAIL_DATA.text);
    expect(textControl.valid).toBeTruthy();
    textControl.setValue('');
    expect(textControl.hasError('required')).toBeTruthy();
  });

  it('should submit form', () => {
    const { to, from, subject, text } = component.emailForm.controls;
    to.setValue('andy@test.com');
    subject.setValue('test');
    text.setValue('test text');

    expect(component.emailForm.valid).toBeTruthy();

    let formValue: any;
    component.emailSubmit
      .pipe(first())
      .subscribe((value) => (formValue = value));
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(formValue).toEqual({
      to: 'andy@test.com',
      subject: 'test',
      text: 'test text',
    });
  });
});
