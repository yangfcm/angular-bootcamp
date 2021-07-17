import { MathValidators } from './math-validators';
import { FormControl, FormGroup } from '@angular/forms';

describe('MathValidators', () => {
  it('should create an instance', () => {
    expect(new MathValidators()).toBeTruthy();
  });

  it('should have static method named addition', () => {
    expect(MathValidators.addition).toBeTruthy();
  });

  it('should return null if answer = number1 + number2', () => {
    const validateFn = MathValidators.addition('number1', 'number2', 'answer');
    const form = new FormGroup({
      number1: new FormControl(3),
      number2: new FormControl(5),
      answer: new FormControl(8),
    });
    expect(validateFn(form)).toBeNull();
  });

  it('should return error information if answer not equal number1 + number2', () => {
    const validateFn = MathValidators.addition('number1', 'number2', 'answer');
    const form = new FormGroup({
      number1: new FormControl(3),
      number2: new FormControl(5),
      answer: new FormControl(9),
    });
    expect(validateFn(form)).toEqual({
      addition: true,
    });
  });
});
