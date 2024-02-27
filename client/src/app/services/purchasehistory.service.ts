import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasehistoryService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) { }

  getHistoryList(): Observable<any>{
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
}
