import { AbstractControl } from '@angular/forms';
import { RegularExpression } from 'src/app/shared/validate/constants';

export class CustomValidators {
  static email(control: AbstractControl) {
    const valid = RegularExpression.Email.test(control.value);
    return valid ? null : { customEmail: true };
  }

  static password(control: AbstractControl) {
    const valid = RegularExpression.Password.test(control.value);
    return valid ? null : { customPassword: true };
  }
}