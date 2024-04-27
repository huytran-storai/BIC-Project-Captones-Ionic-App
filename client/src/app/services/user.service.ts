import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:1337/api';
  private userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  setUserData({ jwt, user }: { jwt: string; user: any }): void {
    this.cookieService.set('auth_token', jwt);
    this.cookieService.set('id', user.id);
    this.cookieService.set('email', user.email);
    console.log(this.cookieService.check('auth_token'));
    this.userData.next(user);
  }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }

  updateInforUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData);
  }
}
