import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '../auth/auth-http-interceptor';

import { EmailService } from './email.service';

export const EMAILS_DATA = [
  { id: '1', subject: 'test email 1', from: 'john@test.com' },
  { id: '2', subject: 'test email 2', from: 'andy@test.com' },
  { id: '3', subject: 'test email 3', from: 'mary@test.com' },
];

export const EMAIL_DATA = {
  id: '1',
  subject: 'test email 1',
  to: 'ming@test.com',
  from: 'john@test.com',
  text: 'Hello from John',
  html: '<div>Hello from John</div>',
};

describe('EmailService', () => {
  let service: EmailService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get emails', () => {
    const requestUrl = `${service.rootUrl}/emails`;
    const expectedReturnData = EMAILS_DATA;
    service.getEmails().subscribe((data) => {
      expect(data).toEqual(expectedReturnData);
    });
    const testRequest = httpTestingController.expectOne(requestUrl);
    expect(testRequest.request.method).toEqual('GET');
    expect(testRequest.request.withCredentials).toBe(true);
    testRequest.flush(EMAILS_DATA);
  });

  it('should get one email by id', () => {
    const requestUrl = `${service.rootUrl}/emails/1`;
    const expectedReturnData = EMAIL_DATA;
    service.getEmail('1').subscribe((data) => {
      expect(data).toEqual(expectedReturnData);
    });

    const testRequest = httpTestingController.expectOne(requestUrl);
    expect(testRequest.request.method).toEqual('GET');
    expect(testRequest.request.withCredentials).toBe(true);
    testRequest.flush(EMAIL_DATA);
  });

  it('should send email', () => {
    const requestUrl = `${service.rootUrl}/emails`;
    const expectedReturnData = EMAIL_DATA;
    service.sendEmail(EMAIL_DATA).subscribe((data) => {
      expect(data).toEqual({ status: 'success' });
    });

    const testRequest = httpTestingController.expectOne(requestUrl);
    expect(testRequest.request.method).toEqual('POST');
    expect(testRequest.request.withCredentials).toBe(true);
    testRequest.flush({ status: 'success' });
  });
});
