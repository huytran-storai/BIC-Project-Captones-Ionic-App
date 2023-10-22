import { Tag } from './../shared/models/Tag';
import { Injectable } from '@angular/core';
import { Store } from '../shared/models/Store';
import { sample_stores, sample_tags, } from 'src/data';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  getAll(): Store[] {
    return sample_stores;

  }

  getAllStoreBySearchTerm(searchTerm: string) {
    return this.getAll().filter(store => store.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllStoreByTagName(tag: string): Store[] {
    return this.getAll().filter(store => store.tags?.includes(tag));
  }


  
  // getProductById(productId:string):Store {
  //   return this.getAll().find(store => store.id == productId) ?? new Store();
  // }
}

