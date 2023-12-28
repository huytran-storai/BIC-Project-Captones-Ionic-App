import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
   // private apiUrl = 'https://attractive-star-afacd2432f.strapiapp.com/api';
  private apiUrl = 'http://localhost:1337/api';

  private userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  setUserData(userData: any): void {
    this.userData.next(userData);
  }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }

  loginUser(credentials: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local`, credentials);
  }

  registerUser(user: { username: string; email: string; password: string; phone: string; role: string; lastname: string; birthday: Date; address: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local/register`, user);
  }
  
}
