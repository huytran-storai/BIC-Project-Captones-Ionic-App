import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/models/Store';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent  implements OnInit {

  stores: Store[] = [];
  isModalOpen = false;
  selectedProduct: any;

  constructor(private StoreService: StoreService) { 
    
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

  ngOnInit(): void {
    this.stores = this.StoreService.getAll();
  }

}
