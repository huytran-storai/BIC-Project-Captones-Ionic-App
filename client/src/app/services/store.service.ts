import { Tag } from './../shared/models/Tag';
import { Injectable } from '@angular/core';
import { ProductItem } from '../shared/models/ProductItem';
import { sampleProductItems, sample_tags, } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // private apiUrl = 'https://attractive-star-afacd2432f.strapiapp.com/api';
  private apiUrl = 'http://localhost:1337/api';
  constructor(private http: HttpClient) { }

  getAllProducts(): ProductItem[] {
    return sampleProductItems;
  }

  getProductById(ProductId: string) {
    return this.http.get(`${this.apiUrl}/products/${ProductId}`);
  }

  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProductTag(){
    return this.http.get(`${this.apiUrl}/product-categories`)
  }

  getAllProductsBySearchTerm(searchTerm: string) {
    return this.getAllProducts().filter(item => item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  // getAllProductsByTagName(tag: string){
  //   return this.getProducts().pipe(filter(item => item.tags?.includes(tag)))
  // }
  
getInfoCheckOut(checkOutData: any): Observable<any>{
  const requestCheckOut ={
    data: checkOutData,
  };
  return this.http.post(`${this.apiUrl}/orders`, requestCheckOut)
}
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

  getCurrentStoreAddress() {
    return this.http.get(`${this.apiUrl}/stores`);
  }

}

