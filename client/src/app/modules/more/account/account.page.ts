import { Component, OnInit } from '@angular/core';
import { AlertController, IonModal, LoadingController, ModalController } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public user: any;
  public UserIdCurrent: any;
  newName: string = '';
  newAddress: string = '';
  newPhone: string = '';
  modal!: IonModal;
  showPassword: boolean = false;
  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private loadingController: LoadingController,) { }

  ngOnInit() {
    this.getUserData();
  }

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   if (ev.detail.role === 'confirm') {
  //     this.message = `${ev.detail.data}`;
  //   }
  // }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  getUserData() {
    this.userService.getUserData().subscribe(
      (res) => {
        this.user = res?.user;
        if (this.user) {
          this.UserIdCurrent = this.user.id;
          this.newName = this.user.name;
          this.newAddress = this.user.address;
          this.newPhone = this.user.phone;
        } else {
          console.log('none');
        }
      },
      (error) => {
        console.log('Error get user data:', error);
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  
  async updateContact() {
    const updateInforUser = {
      id: this.UserIdCurrent,
      name: this.newName,
      address: this.newAddress,
      phone: this.newPhone,
    };
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.userService.updateInforUser(this.UserIdCurrent, updateInforUser).subscribe(
      () => {
        this.user.name = this.newName;
        this.user.address = this.newAddress;
        this.user.phone = this.newPhone;
        this.modalController.dismiss();
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();
        console.log('Lỗi khi cập nhật thông tin người dùng:', error);
      }
    );
  }

}