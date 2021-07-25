import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { EmailService } from '../email.service';
import { EMAIL_DATA } from '../email.service.spec';

import { EmailReplyComponent } from './email-reply.component';

describe('EmailReplyComponent', () => {
  let component: EmailReplyComponent;
  let fixture: ComponentFixture<EmailReplyComponent>;
  let emailServiceStub;
  let replyButton: DebugElement, modal: DebugElement, emailForm: DebugElement;

  beforeEach(async(() => {
    emailServiceStub = jasmine.createSpyObj('EmailService', ['sendEmail']);
    TestBed.configureTestingModule({
      declarations: [EmailReplyComponent],
      providers: [
        {
          provide: EmailService,
          useValue: emailServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailReplyComponent);
    component = fixture.componentInstance;
    component.email = EMAIL_DATA;
    replyButton = fixture.debugElement.query(By.css('button.button'));
    modal = fixture.debugElement.query(By.css('app-modal'));
    emailForm = fixture.debugElement.query(By.css('app-email-form'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render reply button and not render email form initially', () => {
    expect(replyButton).toBeTruthy();
    expect(replyButton.nativeElement.innerText).toContain('Reply');
    expect(modal).toBeFalsy();
    expect(emailForm).toBeFalsy();
  });

  it('should open modal on clicking button', () => {
    replyButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    modal = fixture.debugElement.query(By.css('app-modal'));
    emailForm = fixture.debugElement.query(By.css('app-email-form'));
    expect(modal).toBeTruthy();
    expect(emailForm).toBeTruthy();
    expect(emailForm.properties.email).toEqual(EMAIL_DATA);
  });

  it('should reply email', () => {
    replyButton.triggerEventHandler('click', null);
    expect(component.showModal).toBeTruthy(); // First open modal.

    const replyEmail = EMAIL_DATA;
    const sendEmailSpy = emailServiceStub.sendEmail.and.returnValue(
      of({
        status: 'success',
      })
    );
    component.onSendEmail(replyEmail);
    expect(sendEmailSpy).toHaveBeenCalled();
    expect(component.showModal).toBeFalsy();
  });
});
