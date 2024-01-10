import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public user: any;
  constructor(private userService: UserService,) { }

  ngOnInit() {
    this.getUserData();
  }
  
  getUserData() {
    this.userService.getUserData().subscribe(res => {
      this.user = res?.user
      console.log("check user cur", res)
    } );
  }
}