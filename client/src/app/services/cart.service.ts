import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  

  EmprtCart: any[] = [
  ]
  
  getCartItems(): any[] {
    const cartData = localStorage.getItem('localCart');
    return cartData ? JSON.parse(cartData) : [];
  }
  
  cartSubject = new Subject<any>()
}
