import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularExpression } from 'src/app/shared/validate/constants';
import { UserRegisterService } from 'src/app/services/user-register.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {
  form: FormGroup;
  showPassword: boolean = false;

  constructor(private router: Router, private authService: UserRegisterService, private userService: UserService, private toastController: ToastController,
    private loadingController: LoadingController,) {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(RegularExpression.Password)])
    });
  }

  ngOnInit() {

  }
  

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
  
        await loading.present();
  
        try {
          const response: any = await new Promise((resolve, reject) => {
            this.authService.login({ identifier: email, password })
              .subscribe(resolve, reject);
          });
  
          setTimeout(() => {
            this.userService.setUserData(response);
            loading.dismiss();
            this.router.navigate(['/home']);
          }, 1500);
          const toast = await this.toastController.create({
            message: `Đăng nhập thành công.`,
            duration: 2000,
            position: 'top',
            color: 'success'
          });
      
          toast.present();

        } catch (error) {
          loading.dismiss();
          console.error(error);
          const toast = await this.toastController.create({
            message: `Đăng nhập thất bại.`,
            duration: 1000,
            position: 'bottom',
            color: 'danger'
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
