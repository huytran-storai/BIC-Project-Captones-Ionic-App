import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: any;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
     this.userService.getUserData().subscribe(res=> this.user = res?.user);
  }
}
