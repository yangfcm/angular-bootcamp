import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EmailService } from './email.service';

import { EMAIL_DATA } from './email.service.spec';
import { EmailResolverService } from './email-resolver.service';

describe('EmailResolverService', () => {
  let service: EmailResolverService;
  let emailServiceStub, routerStub, routeStub;
  let getEmailSpy;

  beforeEach(() => {
    emailServiceStub = jasmine.createSpyObj('EmailService', ['getEmail']);
    routerStub = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routeStub = jasmine.createSpyObj(
      'ActivatedRouteSnapshot',
      {},
      { params: { id: '1' } }
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: EmailService, useValue: emailServiceStub },
        { provide: Router, useValue: routerStub },
      ],
    });
    service = TestBed.inject(EmailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to not found page if id does not exist', () => {
    getEmailSpy = emailServiceStub.getEmail.and.returnValue(
      throwError({
        error: 'Not Found',
      })
    );

    service.resolve(routeStub).subscribe();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/inbox/not-found');
  });

  it('should return email data if id is found', () => {
    getEmailSpy = emailServiceStub.getEmail.and.returnValue(of(EMAIL_DATA));

    service.resolve(routeStub).subscribe((data) => {
      expect(data).toEqual(EMAIL_DATA);
    });
  });
});
