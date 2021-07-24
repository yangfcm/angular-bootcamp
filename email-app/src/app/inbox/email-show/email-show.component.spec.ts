import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EMAIL_DATA } from '../email.service.spec';
import { EmailShowComponent } from './email-show.component';

describe('EmailShowComponent', () => {
  let component: EmailShowComponent;
  let fixture: ComponentFixture<EmailShowComponent>;
  let routeStub, getDataSpy;

  beforeEach(async(() => {
    routeStub = jasmine.createSpyObj(
      'ActivatedRoute',
      {},
      {
        data: of({ email: EMAIL_DATA }),
      }
    );

    TestBed.configureTestingModule({
      declarations: [EmailShowComponent],
      providers: [{ provide: ActivatedRoute, useValue: routeStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render email detail', () => {
    const emailDiv = fixture.debugElement.query(
      By.css('div.header')
    ).nativeElement;
    expect(emailDiv.innerText).toContain(EMAIL_DATA.subject);
    expect(emailDiv.innerText).toContain(EMAIL_DATA.from);
    expect(emailDiv.innerText).toContain(EMAIL_DATA.to);
  });

  it('should render email body', () => {
    const emailBody = fixture.debugElement.query(By.css('div.body'));
    expect(emailBody.nativeElement.innerText).toContain(EMAIL_DATA.text);
  });

  it('should render reply button', () => {
    const reply = fixture.debugElement.query(By.css('app-email-reply'));
    expect(reply).toBeTruthy();
    expect(reply.properties.email).toEqual(EMAIL_DATA);
  });
});
