import { Validator, FormGroup } from '@angular/forms';

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
