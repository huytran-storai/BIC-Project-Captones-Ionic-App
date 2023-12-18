import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularExpression } from 'src/app/shared/validate/constants';
import { UserRegisterService } from 'src/app/services/user-register.service';
import { UserService } from 'src/app/services/user.service';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  form: FormGroup;
  showPassword: boolean = false;

  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '8', '4', ' ', '(', /\d/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(private router: Router, private authService: UserRegisterService, private userService: UserService) {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required, Validators.pattern(RegularExpression.AddressPattern)]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(RegularExpression.Password)])
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signup() {
    if (this.form.valid) {
      const emailControl = this.form.get('email');
      const passwordControl = this.form.get('password');

      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;
        this.authService.login({ identifier: email, password })
          .subscribe(
            (response: any) => {
              this.userService.setUserData(response);
              this.router.navigate(['/home']);
            },
            (error) => {
              console.error(error);
            }
          );
      }
    }
  }

}
