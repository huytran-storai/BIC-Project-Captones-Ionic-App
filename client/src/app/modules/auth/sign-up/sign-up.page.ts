import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import type { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import phoneMask from 'src/app/shared/mask/phone-mask';
import { RegularExpression } from 'src/app/shared/validate/constants';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  form: FormGroup;
  showPassword: boolean = false;

  readonly phoneMask: MaskitoOptions = phoneMask;
  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [
        Validators.required,
        Validators.pattern(RegularExpression.AddressPattern),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(RegularExpression.Password),
      ]),
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async signup() {
    if (this.form.valid) {
      const emailControl = this.form.get('email');
      const passwordControl = this.form.get('password');
      const phoneControl = this.form.get('phone');
      const addressControl = this.form.get('address');

      if (emailControl && passwordControl && phoneControl && addressControl) {
        const email = emailControl.value;
        const password = passwordControl.value;
        const phone = phoneControl.value;
        const address = addressControl.value;

        const loading = await this.loadingController.create({
          message: 'Vui lòng chờ...',
        });

        loading.present();

        const response = await lastValueFrom(
          this.authService.register({
            username: email,
            email,
            password,
            phone,
            address,
          })
        );

        if (JSON.stringify(response) !== '{"jwt":"","user":{}}') {
          setTimeout(() => {
            this.userService.setUserData(response);
            loading.dismiss();
            this.router.navigate(['/home']);
          }, 1500);

          const toast = await this.toastController.create({
            message: `Đăng ký tài khoản thành công.`,
            duration: 2000,
            position: 'top',
            color: 'success',
          });

          toast.present();
        } else {
          loading.dismiss();

          const toast = await this.toastController.create({
            message: `Đăng ký tài khoản thất bại thất bại.`,
            duration: 1000,
            position: 'bottom',
            color: 'danger',
          });

          toast.present();
        }
      }
    }
  }
}
