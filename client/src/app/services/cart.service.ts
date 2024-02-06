import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:1337/api';
  private cartItemsSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  

  // pushProducts(productData: {
  //   ProductName: string;
  //   ProductPrice: number;
  //   QuantityDefault: number;
  //   ProductImage: string;
  //   ProductId: number;
  // }): Observable<any> {
  //   const requestData = {
  //     data: productData,
  //   };
  //   return this.http.post(`${this.apiUrl}/cart-items`, requestData);
  // }

  pushProducts(productData: {
    ProductName: string;
    ProductPrice: number;
    QuantityDefault: number;
    ProductImage: string;
    ProductId: number;
  }): Observable<any> {
    const requestData = {
      data: productData,
    };
    return this.http.post(`${this.apiUrl}/cart-items`, requestData)
      .pipe(
        tap((response: any) => {
          this.cartItemsSubject.next(response);
        })
      );
  }

  getCartItemsObservable(): Observable<any> {
    return this.cartItemsSubject.asObservable();
  }
  
  getProductsCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart-items`);
  }

  postProductsAPI(productNames: any): Observable<any> {
    const requestData = {
      data: productNames,
    };
    return this.http.post(`${this.apiUrl}/cart-items`, requestData);
  }

  deleteProduct(strapiId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${strapiId}`);
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
    return this.http.delete(`${this.apiUrl}/cart-items/${productData.id}`);
  }

  deleteAll(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${id}`);
  }

  EmprtCart: any[] = [];

  getCartItems(): any[] {
    const cartData = localStorage.getItem('localCart');
    return cartData ? JSON.parse(cartData) : [];
  }

  cartSubject = new Subject<any>();
}
