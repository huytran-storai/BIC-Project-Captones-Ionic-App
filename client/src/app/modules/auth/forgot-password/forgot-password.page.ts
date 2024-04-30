import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {}

  async forgotPassword() {
    if (this.form.valid) {
      const emailControl = this.form.get('email');
      if (emailControl) {
        const email = emailControl.value;
        const res = (await lastValueFrom(
          this.authService.forgotPassword(email)
        )) as { ok: boolean };
        if (res.ok) {
        }
      }
    }
  }
}
