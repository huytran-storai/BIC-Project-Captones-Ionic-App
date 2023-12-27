import { Tag } from './../shared/models/Tag';
import { Injectable } from '@angular/core';
import { ProductItem } from '../shared/models/ProductItem';
import { sampleProductItems, sample_tags, } from 'src/data';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // private apiUrl = 'https://attractive-star-afacd2432f.strapiapp.com/api';
  private apiUrl = 'http://localhost:1337/api';
  constructor(private http: HttpClient) { }

  getStores() {
    return this.http.get<ProductItem[]>('/api/stores');
  }

  getAll(): ProductItem[] {
    return sampleProductItems;
  }
  
  getProductById(id: any): ProductItem | undefined {
    return sampleProductItems.find(item => item.id === id);
  }

  getAllStoreBySearchTerm(searchTerm: string) {
    return this.getAll().filter(item => item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllStoreByTagName(tag: string): ProductItem[] {
    return this.getAll().filter(item => item.tags?.includes(tag));
  }

  getCurrentStoreAddress() {
    return this.http.get(`${this.apiUrl}/stores`);
  }

}

