import { Injectable } from '@angular/core';
import { sample_histoy } from 'src/data';
import { Histories } from '../shared/models/Histories';

@Injectable({
  providedIn: 'root'
})
export class PurchasehistoryService {

  constructor() { }

  getHistory() : Histories[]{
    return sample_histoy
  }

  getHistoryById(id: any): Histories | undefined {
    return sample_histoy.find(item => item.id === id);
  }

  // saveShoppingHistory(items: any[]): void {
  //   localStorage.setItem('shoppingHistory', JSON.stringify(items));
  // }
}
