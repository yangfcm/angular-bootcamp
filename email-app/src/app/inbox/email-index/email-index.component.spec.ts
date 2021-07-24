import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { EmailService } from '../email.service';
import { EMAILS_DATA } from '../email.service.spec';
import { EmailIndexComponent } from './email-index.component';

describe('EmailIndexComponent', () => {
  let component: EmailIndexComponent;
  let fixture: ComponentFixture<EmailIndexComponent>;
  let emailServiceStub: any;
  let getEmailsSpy: any;

  beforeEach(async(() => {
    emailServiceStub = jasmine.createSpyObj('EmailService', ['getEmails']);
    getEmailsSpy = emailServiceStub.getEmails.and.returnValue(of(EMAILS_DATA));

    TestBed.configureTestingModule({
      declarations: [EmailIndexComponent],
      providers: [{ provide: EmailService, useValue: emailServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get emails', () => {
    expect(component.emails).toEqual(EMAILS_DATA);
  });

  it('should render emails list', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(EMAILS_DATA.length);
    for (let i = 0; i < EMAILS_DATA.length; i++) {
      const email = EMAILS_DATA[i];
      const link = links[i];
      expect(link.nativeElement.innerText).toContain(email.subject);
      expect(link.nativeElement.innerText).toContain(email.from);
      expect(link.properties['routerLink']).toBe(email.id);
    }
  });
});
