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

  getProductById(Product_Id: string) {
    return this.http.get(`${this.apiUrl}/products/${Product_Id}`);
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
  

  

  getCurrentStoreAddress() {
    return this.http.get(`${this.apiUrl}/stores`);
  }

}

