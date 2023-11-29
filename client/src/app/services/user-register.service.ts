import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) { }

  login(credentials: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local`, credentials);
  }

  register(user: { username: string; email: string; password: string; phone: string; role: string; lastname: string; birthday: Date; address: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local/register`, user);
  }
}