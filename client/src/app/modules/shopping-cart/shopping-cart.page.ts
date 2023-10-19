import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/Store';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],

})

export class ShoppingCartPage implements OnInit {
  stores: Store[] = [];
  tax = 0.65
  checkItemsCart : boolean = true;
  private _numberOfItems: number | undefined;
  alerCtrl: any;
  get numberOfItems(): number | undefined {
    return this._numberOfItems;
  }
  set numberOfItems(value: number | undefined) {
    this._numberOfItems = value;
    this.checkItemsCart = this.calculateTestSuccess(value);
  }
  ngOnInit(): void {
    this.stores = this.StoreService.getAll();
    this.numberOfItems = this.stores.length;
  };
  private calculateTestSuccess(numberOfItems: number | undefined): boolean {
    if (numberOfItems === 0) {
      return false;
    } else {
      return true;
    }
  }
  subTotalAmount: number | undefined;
  constructor(private modalController: ModalController,private location: Location, private StoreService: StoreService,private alertController: AlertController) { }
  
 closeAlert(){
  this.modalController.dismiss();
 }
 delProduct(){
  while (this.stores.length > 0) {
    this.stores.pop(); 
    this.numberOfItems = this.stores.length;
  }
  this.modalController.dismiss();
}

async showModal() {
  const modal = await this.modalController.create({
    component: ShoppingCartPage,
    cssClass: 'alert-modal',
  });
  return await modal.present();
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