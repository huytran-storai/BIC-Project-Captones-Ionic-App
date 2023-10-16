import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validate/Shared-Validation';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage{
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password: ['', [Validators.required]],
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
    this.router.navigate(['/signup']);
  }

  forgotPass() {
    this.router.navigate(['/forgot-password']);
  }

}
