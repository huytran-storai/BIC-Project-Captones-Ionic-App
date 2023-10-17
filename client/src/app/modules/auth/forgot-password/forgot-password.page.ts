import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form: FormGroup;
  constructor(private router: Router) {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    
  }

  login() {
    if (this.form.valid) {
      this.router.navigate(['/login']);
    }
  }

  resetPassWord() {

  }

}
