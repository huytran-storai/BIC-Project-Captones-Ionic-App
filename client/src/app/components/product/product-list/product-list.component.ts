import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/models/Store';
import { StoreService } from 'src/app/services/store.service';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  stores: Store[] = [];
  isModalOpen = false;
  selectedProduct: any;
  isModalViewAllProductOpen = false;

  constructor(private StoreService: StoreService, private modalController: ModalController) {
  }

  setOpen(store: any) {
    this.selectedProduct = store;
    this.isModalOpen = true;
  }

  viewAll(){
    this.isModalViewAllProductOpen = true;
  }

  async setClose() {
    this.selectedProduct = null;
    this.isModalOpen = false;
  }

  async setCloseViewAll() {
    this.isModalViewAllProductOpen = false;
  }

  ngOnInit(): void {
    this.stores = this.StoreService.getAll();
  }

  addProduct(store: any) {
    store.added = !store.added;
  }
}
