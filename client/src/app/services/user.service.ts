import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:1337/api';
  private userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

constructor(private http: HttpClient) { }

  setUserData(userData: any): void {
    this.userData.next(userData);
  }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }
  

  updateInforUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData)
  }

}
