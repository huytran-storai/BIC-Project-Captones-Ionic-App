import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:1337/api';
  private cartItemsSubject: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) {}

  getInfoCheckOut(){
    return this.http.get(`${this.apiUrl}/orders`)
  }

  getInfoPayment(){
    return this.http.get(`${this.apiUrl}/payment-managements`)
  }

  deleteAll(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${id}`)
    .pipe(
      tap((response: any) => {
        this.cartItemsSubject.next(response);
      })
    );
  }

  getCartItemsObservable(): Observable<any> {
    return this.cartItemsSubject.asObservable();
  }
}
