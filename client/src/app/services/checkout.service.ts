import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  getProductsCart() {
    return this.http.get(`${this.apiUrl}/cart-items`);
  }

  getInfoCheckOut(){
    return this.http.get(`${this.apiUrl}/orders`)
  }
}
