import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  public user: any;
  constructor(private router: Router,private userService: UserService,) { }

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

  logout() {
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
