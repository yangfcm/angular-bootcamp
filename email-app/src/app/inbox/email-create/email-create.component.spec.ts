import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';

import { EmailCreateComponent } from './email-create.component';

describe('EmailCreateComponent', () => {
  let component: EmailCreateComponent;
  let fixture: ComponentFixture<EmailCreateComponent>;
  let emailServiceStub, authServiceStub;
  let newEmailButton: DebugElement,
    modal: DebugElement,
    emailForm: DebugElement;

  beforeEach(async(() => {
    emailServiceStub = jasmine.createSpyObj('EmailService', ['sendEmail']);
    authServiceStub = jasmine.createSpyObj('AuthService', [], {
      username: 'john',
    });
    TestBed.configureTestingModule({
      declarations: [EmailCreateComponent],
      providers: [
        {
          provide: EmailService,
          useValue: emailServiceStub,
        },
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCreateComponent);
    component = fixture.componentInstance;
    newEmailButton = fixture.debugElement.query(By.css('button.button'));
    modal = fixture.debugElement.query(By.css('app-modal'));
    emailForm = fixture.debugElement.query(By.css('app-email-form'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render new email button and not render email form initially', () => {
    expect(newEmailButton).toBeTruthy();
    expect(newEmailButton.nativeElement.innerText).toContain('New Email');
    expect(modal).toBeFalsy();
    expect(emailForm).toBeFalsy();
    expect(component.email).toEqual({
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authServiceStub.username}@angular-email.com`,
    });
  });

  it('should open modal on clicking button', () => {
    newEmailButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    modal = fixture.debugElement.query(By.css('app-modal'));
    emailForm = fixture.debugElement.query(By.css('app-email-form'));
    expect(modal).toBeTruthy();
    expect(emailForm).toBeTruthy();
    expect(emailForm.properties.email).toEqual({
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authServiceStub.username}@angular-email.com`,
    });
  });

  it('should send email', () => {
    newEmailButton.triggerEventHandler('click', null);
    expect(component.showModal).toBeTruthy(); // First open modal.

    const newEmail = {
      id: '1',
      to: 'andy@test.com',
      subject: 'test',
      text: 'test text',
      html: '<div>test text</div>',
      from: `${authServiceStub.username}@angular-email.com`,
    };
    const sendEmailSpy = emailServiceStub.sendEmail.and.returnValue(
      of({
        status: 'success',
      })
    );
    component.onSendEmail(newEmail);
    expect(sendEmailSpy).toHaveBeenCalled();
    expect(component.showModal).toBeFalsy();
  });
});
