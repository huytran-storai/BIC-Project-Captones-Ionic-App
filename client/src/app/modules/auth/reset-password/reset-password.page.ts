import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularExpression } from 'src/app/shared/validate/constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  showPassword: boolean = false;
  form: FormGroup;
  constructor(private router: Router) {
    this.form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(RegularExpression.Password),
      ]),
    });
  }

  ngOnInit() {
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  update() {
    if (this.form.valid) {
      this.router.navigate(['/login']);
    }
  }

}
