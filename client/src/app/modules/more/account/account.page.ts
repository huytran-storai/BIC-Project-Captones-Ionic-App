import { Component, OnInit } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public user: any;
  modal!: IonModal;
  showPassword: boolean = false;
  constructor(private userService: UserService,private modalController: ModalController,) { }

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
    this.userService.getUserData().subscribe(res => {
      this.user = res?.user
      console.log("check user cur", res)
    } );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}