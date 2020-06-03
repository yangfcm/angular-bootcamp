import { AbstractControl } from '@angular/forms';

export class MathValidators {
  static addition(number1: string, number2: string, answer: string) {
    return (form: AbstractControl) => {
      const add1 = form.value[number1];
      const add2 = form.value[number2];
      const sum = form.value[answer];
      if (Number(add1) + Number(add2) === Number(sum)) {
        return null;
      }
      return { addition: true };
    };
  }
}
