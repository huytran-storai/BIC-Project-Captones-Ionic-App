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

  async getUserData() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        console.log('User data:', this.user);
      },
      (error) => {
        console.log('Error get user data:', error);
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

}