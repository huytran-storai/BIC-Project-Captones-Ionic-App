import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) { }

  getProductsCart() {
    return this.http.get(`${this.apiUrl}/cart-items`);
  }

  pushProducts(productData: { 
    ProductName: string, 
    ProductPrice: number, 
    QuantityDefault: number, 
    ProductImage: string,
    ProductId: number
  }): Observable<any> {
    const requestData = { 
      data: productData 
    };
    return this.http.post(`${this.apiUrl}/cart-items`, requestData);
  }

  // pushProducts(data: { 
  //   // UserId: number,
  //   ProductData: { 
  //     ProductName: string, 
  //     ProductPrice: number, 
  //     QuantityDefault: number, 
  //     ProductImage: string,
  //   }
  // }): Observable<any> {
  //   const requestData = { 
  //     // UserId: data.UserId,
  //     ProductData: data.ProductData
  //   };
  //   console.log("request", requestData)
  //   return this.http.post(`${this.apiUrl}/cart-items`, requestData);
  // }
  

  addSL(productData: { QuantityDefault: number}): Observable<any> {
    const requestDataSL = { 
      data: productData 
    };
    console.log('Request Data:', requestDataSL);
    return this.http.put(`${this.apiUrl}/cart-items/:id`, requestDataSL);
  }
  
  

  
  EmprtCart: any[] = [
  ]
  
  getCartItems(): any[] {
    const cartData = localStorage.getItem('localCart');
    return cartData ? JSON.parse(cartData) : [];
  }
  
  cartSubject = new Subject<any>()
}
