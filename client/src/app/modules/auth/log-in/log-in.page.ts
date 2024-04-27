import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { RegularExpression } from 'src/app/shared/validate/constants';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {
  form: FormGroup;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(RegularExpression.Password),
      ]),
    });
  }

  ngOnInit() {}

  async login() {
    if (this.form.valid) {
      const emailControl = this.form.get('email');
      const passwordControl = this.form.get('password');

      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;

        const loading = await this.loadingController.create({
          message: 'Vui lòng chờ...',
        });

        loading.present();

        const response = await lastValueFrom(
          this.authService.login({
            identifier: email,
            password,
          })
        );

        if (JSON.stringify(response) !== '{"jwt":"","user":{}}') {
          setTimeout(() => {
            this.userService.setUserData(response);
            loading.dismiss();
            this.router.navigate(['/home']);
          }, 1500);

          const toast = await this.toastController.create({
            message: `Đăng nhập thành công.`,
            duration: 2000,
            position: 'top',
            color: 'success',
          });

          toast.present();
        } else {
          loading.dismiss();

          const toast = await this.toastController.create({
            message: `Đăng nhập thất bại.`,
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

  signup() {
    this.router.navigate(['/signup']);
  }

  forgotPass() {
    this.router.navigate(['/forgot-password']);
  }
}
