import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/Store';
// import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],

})

export class ShoppingCartPage implements OnInit {
  stores: Store[] = [];
  tax = 0.65;
  numberOfItems: number | undefined;
  pickupChecked: boolean = false;
  deliveryChecked: boolean = false;
  subTotalAmount: number | undefined;

  constructor(private location: Location, private StoreService: StoreService,) { }

  ngOnInit(): void {
    this.stores = this.StoreService.getAll();
    this.numberOfItems = this.stores.length;
  };

  onCheckboxChange(type: 'pickup' | 'delivery') {
    if (type === 'pickup') {
      this.deliveryChecked = false;
    } else if (type === 'delivery') {
      this.pickupChecked = false;
    }
  }

  incProduct(prod: any) {
    prod.productQuantityAddDefault += 1
  }

  decProduct(prod: Store) {
    if (prod.productQuantityAddDefault > 1) {
      prod.productQuantityAddDefault -= 1;
    } else if (prod.productQuantityAddDefault === 1) {
      prod.productQuantityAddDefault = 0;
      this.stores = this.stores.filter(item => item !== prod);
      this.numberOfItems = this.stores.length;
      this.updateSubTotal();
    }
  }

  updateSubTotal() {
    this.subTotalAmount = this.subTotal();
  }

  subTotal(): number {
    let subTotal = 0;
    for (const product of this.stores) {
      subTotal += product.originalPrice * product.productQuantityAddDefault;
    }
    return subTotal;
  }

  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
  }

}