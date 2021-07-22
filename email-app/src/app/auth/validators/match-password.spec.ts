import { MatchPassword } from './match-password';
import { FormControl, FormGroup } from '@angular/forms';

describe('MatchPassword', () => {
  let matchPasswordValidator: MatchPassword;

  beforeEach(() => {
    matchPasswordValidator = new MatchPassword();
  });

  it('should create an instance', () => {
    expect(matchPasswordValidator).toBeTruthy();
  });

  it('should have validate method', () => {
    expect(matchPasswordValidator.validate).toBeTruthy();
  });

  it('should return null if passwords are match', () => {
    const formGroup = new FormGroup({
      password: new FormControl('abcdefg'),
      passwordConf: new FormControl('abcdefg'),
    });
    expect(matchPasswordValidator.validate(formGroup)).toBe(null);
  });

  it('should return passwordsDontMatch error if passwords are not match', () => {
    const formGroup = new FormGroup({
      password: new FormControl('abcdefg'),
      passwordConf: new FormControl('abcdefg+'),
    });
    expect(matchPasswordValidator.validate(formGroup)).toEqual({
      passwordsDontMatch: true,
    });
  });
});
