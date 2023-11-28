import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setUserData(userData: any): void {
    this.userData.next(userData);
  }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }
  
}
