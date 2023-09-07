import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../shared/models/Store';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.page.html',
  styleUrls: ['./search-product.page.scss'],
})
export class SearchProductPage implements OnInit {
  searchTerm = '';
  stores: Store[] = [];
  isModalOpen = false;
  selectedProduct: any;
  constructor(
    private StoreService: StoreService,
  ) {
  }

  ngOnInit(): void {
   
  }

  search(event: any): void {
    const term = event.target.value;
    this.searchTerm = term;
    this.updateSearchResults();
  }

  updateSearchResults(): void {
    if (this.searchTerm) {
      this.stores = this.StoreService.getAllStoreBySearchTerm(this.searchTerm);
    }
    else{
      this.stores = []
    }
  }

  setOpen(store: any) {
    this.selectedProduct = store;
    this.isModalOpen = true;
    // console.log(this.selectedProduct);
  }
  
  setClose(isOpen:boolean) {
    this.selectedProduct = null;
    this.isModalOpen = isOpen;
  }

}
