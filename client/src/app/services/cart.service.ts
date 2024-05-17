import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:1337/api';
  // private cartItemsSubject: Subject<any> = new Subject<any>();
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private checkoutSubject = new Subject<void>();
  checkout$ = this.checkoutSubject.asObservable();
  constructor(private http: HttpClient) {

    // const cartData = this.getCartItemsFromLocalStorage();
    // this.cartItemsSubject.next(cartData);
  }

  pushProducts(productData: {
    ProductName: string;
    ProductPrice: number;
    QuantityDefault: number;
    ProductImage: string;
    ProductId: number;
    OrderedUserId: number;
  }): Observable<any> {
    const requestData = {
      data: productData,
    };
    return this.http.post(`${this.apiUrl}/cart-items`, requestData)
      .pipe(
        tap((response: any) => {
          const cartItems = this.cartItemsSubject.value;
          cartItems.push({ ...productData, strapiId: response.data.id });
          this.cartItemsSubject.next(cartItems);
          // this.updateLocalStorage(cartItems);
        })
      );
  }

  deleteProduct(strapiId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${strapiId}`)
      .pipe(
        tap(() => {
          const cartItems = this.cartItemsSubject.value.filter(item => item.strapiId !== strapiId);
          this.cartItemsSubject.next(cartItems);
          // this.updateLocalStorage(cartItems);
        })
      );
  }

  getCartItems(): any[] {
    return this.cartItemsSubject.value;
  }


  emitCheckoutEvent() {
    this.checkoutSubject.next();
    this.checkoutSubject.pipe( 
      tap((response: any) => {
        this.cartItemsSubject.next(response);
      })
    ).subscribe(); 
}



  getCartItemsObservable(): Observable<any> {
    return this.cartItemsSubject.asObservable();
  }

  postProductsAPI(productNames: any): Observable<any> {
    const requestData = {
      data: productNames,
    };
    return this.http.post(`${this.apiUrl}/cart-items`, requestData);
  }

  increaseItem(productData: {
    id: number;
    productQuantityAddDefault: number;
  }): Observable<any> {
    const requestIncrease = {
      data: productData,
    };
    return this.http.put(
      `${this.apiUrl}/cart-items/${productData.id}`,
      requestIncrease
    );
  }

  deleteItem(productData: { id: number }): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${productData.id}`)
    .pipe(
      tap((response: any) => {
        this.cartItemsSubject.next(response);
      })
    );
  }

  deleteAll(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${id}`)
    .pipe(
      tap((response: any) => {
        this.cartItemsSubject.next(response);
      })
    );
  }

  getProductsCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart-items`);
  }

  EmprtCart: any[] = [];


  cartSubject = new Subject<any>();
}
