import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { RegularExpression } from 'src/app/shared/validate/constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  showPassword: boolean = false;
  form: FormGroup;
  code: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(RegularExpression.Password),
      ]),
    });

    this.code = this.route.snapshot.queryParamMap.get('code') ?? '';
  }

  ngOnInit() {}

  async resetPassword() {
    if (this.form.valid) {
      const passwordControl = this.form.get('password');

      if (passwordControl) {
        const password = passwordControl.value;

        const loading = await this.loadingController.create({
          message: 'Vui lòng chờ...',
        });

        loading.present();

        const res = await lastValueFrom(
          this.authService.resetPassword(this.code, password, password)
        );

        if (JSON.stringify(res) !== '{}') {
          setTimeout(() => {
            const { jwt, user } = res;
            this.userService.setUserData(jwt!, user!);
            loading.dismiss();
            this.router.navigate(['/home']);
          }, 1500);

          const toast = await this.toastController.create({
            message: `Đặt lại mật khẩu thành công.`,
            duration: 2000,
            position: 'top',
            color: 'success',
          });

          toast.present();
        } else {
          loading.dismiss();

          const toast = await this.toastController.create({
            message: `Đặt lại mật khẩu thất bại.`,
            duration: 1000,
            position: 'bottom',
            color: 'danger',
          });

          toast.present();
        }
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
