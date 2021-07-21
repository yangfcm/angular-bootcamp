import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { BehaviorSubject, Observable } from 'rxjs';

describe('AuthGuard', () => {
  beforeEach(() => {
    guard = new AuthGuard(serviceStub as AuthService, routerSpy);
  });

  let guard: AuthGuard;
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
  let serviceStub: Partial<AuthService> = {};

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  describe('When the user is not logged in', () => {
    beforeEach(() => {
      serviceStub.signedIn$ = new BehaviorSubject(null);
      serviceStub.signedIn$.next(true);
    });

    afterEach(() => {
      serviceStub.signedIn$.unsubscribe();
    });

    it('canLoad() should return true', () => {
      (guard.canLoad() as Observable<boolean>).subscribe((canLoad) => {
        expect(canLoad).toBe(true);
      });
    });
  });

  describe('When the user is not logged in', () => {
    beforeEach(() => {
      serviceStub.signedIn$ = new BehaviorSubject(null);
      serviceStub.signedIn$.next(false);
    });

    afterEach(() => {
      serviceStub.signedIn$.unsubscribe();
    });

    it('canLoad() should return false and navigate to /signin', () => {
      (guard.canLoad() as Observable<boolean>).subscribe((canLoad) => {
        expect(canLoad).toBe(false);
      });
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/signin');
    });
  });
});
