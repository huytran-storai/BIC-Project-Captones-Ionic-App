import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  getProductsCart() {
    return this.http.get(`${this.apiUrl}/cart-items`);
  }

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
    return this.http.post(`${this.apiUrl}/cart-items`, requestData);
  }

  //   postProductsAPI(productDataAPI: {
  //     itemLocal: any[],
  // }): Observable<any> {
  //     const requestDataAPI = {
  //         data: {
  //             attributes: {
  //                 products: productDataAPI
  //             }
  //         }
  //     };
  //     console.log("requestDataAPI:", requestDataAPI);
  //     return this.http.post(`${this.apiUrl}/cart-items`, requestDataAPI);
  // }

  postProductsAPI(productNames: any): Observable<any> {
    const requestData = {
      data: productNames,
    };
    return this.http.post(`${this.apiUrl}/cart-items`, requestData);
  }

  // postProductsAPI(productDataAPI: {
  //   ProductPrice: number,  // Adjust the type if necessary
  //   ProductName: string,
  //   // Add other necessary fields
  // }): Observable<any> {
  //   const requestDataAPI = {
  //     data: {
  //       attributes: productDataAPI
  //     }
  //   };
  //   console.log("requestDataAPI:",requestDataAPI)
  //   return this.http.post(`${this.apiUrl}/cart-items`, requestDataAPI);
  // }

  // deleteProduct(id: any): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/cart-items/${id}`);
  // }

  deleteProduct(strapiId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${strapiId}`);
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

  // decreaseItem(productData: {id: number, productQuantityAddDefault: number}): Observable<any> {
  //   const requestDecrease ={
  //     data: productData
  //   }
  //   return this.http.delete(`${this.apiUrl}/cart-items/${productData.id}`, requestDecrease);
  // }

  EmprtCart: any[] = [];

  getCartItems(): any[] {
    const cartData = localStorage.getItem('localCart');
    return cartData ? JSON.parse(cartData) : [];
  }

  cartSubject = new Subject<any>();
}
