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
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.user = JSON.parse(storedUserData);
    } else {
      this.getUserData();
    }
  }

  getUserData() {
    this.userService.getUserData().subscribe(res => {
      this.user = res?.user
      localStorage.setItem('userData', JSON.stringify(this.user));
    } );
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']).then(() => {
      console.log("log out");
      window.location.reload();
    });
  }
}
