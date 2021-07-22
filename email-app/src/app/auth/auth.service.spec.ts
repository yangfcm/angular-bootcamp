import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { skip } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth-http-interceptor';

describe('AuthService', () => {
  let service: AuthService;
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
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send post request to check if username is available', () => {
    const requestUrl = `${service.rootUrl}/auth/username`;
    const expectedReturnData = {
      available: true,
    };
    service.usernameAvailable('test_username').subscribe((data) => {
      expect(data).toEqual(expectedReturnData);
    });
    const testRequest = httpTestingController.expectOne(requestUrl);
    expect(testRequest.request.method).toEqual('POST');
    testRequest.flush(expectedReturnData);
  });

  it('should sign up a user', () => {
    const requestUrl = `${service.rootUrl}/auth/signup`;
    const requestData = {
      username: 'test',
      password: 'abcde12345',
      passwordConf: 'abcde12345',
    };
    const expectedResponseData = {
      username: 'test',
    };

    service.signup(requestData).subscribe((data) => {
      expect(data).toEqual(expectedResponseData);
    });
    service.signedIn$.pipe(skip(1)).subscribe((signedIn) => {
      expect(signedIn).toBe(true);
    });

    const testRequest = httpTestingController.expectOne(requestUrl);
    expect(testRequest.request.method).toEqual('POST');
    expect(testRequest.request.body).toEqual({
      username: requestData.username,
      password: requestData.password,
      passwordConfirmation: requestData.passwordConf,
    });
    expect(testRequest.request.withCredentials).toBe(true);
    testRequest.flush(expectedResponseData);
    expect(service.username).toBe('test');
  });

  it('should sign in user', () => {
    const requestUrl = `${service.rootUrl}/auth/signin`;
    const requestData = {
      username: 'test',
      password: 'abcde12345',
    };
    const expectedResponseData = {
      authenticated: true,
      username: 'test',
    };

    service.signin(requestData).subscribe((data) => {
      expect(data).toEqual(expectedResponseData);
    });
    service.signedIn$.pipe(skip(1)).subscribe((signedIn) => {
      expect(signedIn).toBe(true);
    });

    const testRequest = httpTestingController.expectOne(requestUrl);
    expect(testRequest.request.method).toEqual('POST');
    expect(testRequest.request.body).toEqual({ ...requestData });
    expect(testRequest.request.withCredentials).toBe(true);
    testRequest.flush(expectedResponseData);
    expect(service.username).toBe('test');
  });

  it('should return error on failed sign in', () => {
    const requestUrl = `${service.rootUrl}/auth/signin`;
    const requestData = {
      username: 'test',
      password: 'abcde12345',
    };
    const expectedErrorResponse = {
      status: 422,
      error: {
        username: 'Email not found',
        password: 'Invalid password',
      },
    };

    service.signin(requestData).subscribe(
      (data) => {},
      ({ error }) => {
        expect(error.error.username).toBe('Email not found');
        expect(error.error.password).toBe('Invalid password');
      }
    );
    service.signedIn$.subscribe((signedIn) => {
      expect(signedIn).toBe(null);
    });

    const testRequest = httpTestingController.expectOne(requestUrl);
    testRequest.flush(expectedErrorResponse, {
      status: 422,
      statusText: 'Failed to auth',
    });
    expect(service.username).toBe('');
  });

  it('should check the authorisation of a user', () => {
    const requestUrl = `${service.rootUrl}/auth/signedin`;
    const expectedResponseData = {
      authenticated: true,
      username: 'test',
    };

    service.checkAuth().subscribe((data) => {
      expect(data).toEqual(expectedResponseData);
    });
    service.signedIn$.pipe(skip(1)).subscribe((signedIn) => {
      expect(signedIn).toBe(expectedResponseData.authenticated);
    });

    const testRequest = httpTestingController.expectOne(requestUrl);
    testRequest.flush(expectedResponseData);
    expect(service.username).toBe(expectedResponseData.username);
  });

  it('should sign out a user', () => {
    const requestUrl = `${service.rootUrl}/auth/signout`;

    service.signout().subscribe(() => {});
    service.signedIn$.pipe(skip(1)).subscribe((signedIn) => {
      expect(signedIn).toBe(false);
    });
    const testRequest = httpTestingController.expectOne(requestUrl);
    testRequest.flush({});
    expect(service.username).toBe('');
  });
});
