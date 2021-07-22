import { UniqueUsername } from './unique-username';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';

describe('UniqueUsername', () => {
  beforeEach(() => {
    uniqueUsername = new UniqueUsername(authServiceSpy);
  });

  let uniqueUsername: UniqueUsername;
  let authServiceSpy = jasmine.createSpyObj('AuthService', [
    'usernameAvailable',
  ]);

  it('should create an instance', () => {
    expect(uniqueUsername).toBeTruthy();
  });

  it('should return null if username is available', () => {
    const spy = authServiceSpy.usernameAvailable.and.returnValue(
      of({
        available: true,
      })
    );
    uniqueUsername
      .validate(new FormControl('availabe_username'))
      .subscribe((data) => {
        expect(data).toBeNull();
      });
    expect(spy).toHaveBeenCalled();
  });

  it('should return nonUniqueUsername info if username is used', () => {
    const spy = authServiceSpy.usernameAvailable.and.returnValue(
      throwError({
        error: {
          username: 'Username in use',
        },
      })
    );
    uniqueUsername
      .validate(new FormControl('used_username'))
      .subscribe((data) => {
        expect(data).toEqual({
          nonUniqueUsername: true,
        });
      });
    expect(spy).toHaveBeenCalled();
  });
});
