import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validate/Shared-Validation';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.password]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.router.navigate(['/home']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signup() {
    this.router.navigate(['/login']);
  }
}
