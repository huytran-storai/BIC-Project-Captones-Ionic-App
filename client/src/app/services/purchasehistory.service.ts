import { Injectable } from '@angular/core';
import { sample_histoy } from 'src/data';
import { Histories } from '../shared/models/Histories';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchasehistoryService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) { }

  getHistory() : Histories[]{
    return sample_histoy
  }

  getHistoryById(id: any): Histories | undefined {
    return sample_histoy.find(item => item.id === id);
  }

  getHistoryList(){
    return this.http.get(`${this.apiUrl}/orders/`)
  }
  
  parseJsonFromString(jsonString: string): any[] {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Invalid JSON string:', error);
      return [];
    }
  }

  // getProductById(ProductId: string) {
  //   return this.http.get(`${this.apiUrl}/products/${ProductId}`);
  // }

  // getProducts() {
  //   return this.http.get(`${this.apiUrl}/products`);
  // }
}
