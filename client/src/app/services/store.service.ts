import { Injectable } from '@angular/core';
import { Store } from '../shared/models/Store';
import { sample_stores } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  getAll():Store[]{
    return sample_stores;
  }

  getAllStoreBySearchTerm(searchTerm:string){
    return this.getAll().filter(store => store.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }
}
