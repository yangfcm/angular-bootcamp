import { Validator, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    const { password, passwordConf } = formGroup.value;
    if (password === passwordConf) {
      return null;
    }
    return {
      passwordsDontMatch: true,
    };
  }
}
