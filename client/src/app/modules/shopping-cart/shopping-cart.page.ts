import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { Cart } from 'src/app/shared/models/Cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],

})

export class ShoppingCartPage implements OnInit {
  CartItem = ''
  tax = 0.65
  checkItemsCart : boolean = true;
  public _numberOfItems: number | undefined;
  alerCtrl: any;
  ngOnInit(): void {
    
  }
  ionViewWillEnter() {
    this.CartDetails()
    this.cartNumberFunc();
    this.readLocalStorageCart(); 
  }

  readLocalStorageCart() {
    var cartValue = localStorage.getItem('localCart');
    if (cartValue !== null) {
      this.getCartDetails = JSON.parse(cartValue);
      this.numberOfItems = this.getCartDetails.length;
      this.updateSubTotal();
    }
  }
  get numberOfItems(): number | undefined {
    return this._numberOfItems;
  }
  set numberOfItems(value: number | undefined) {
    this._numberOfItems = value;
    this.checkItemsCart = this.calculateItem(value);
  }

  private calculateItem(numberOfItems: number | undefined): boolean {
    if (numberOfItems === 0) {
      return false;
    } else {
      return true;
    }
  }
  subTotalAmount: number | undefined;
  constructor(private CartService: CartService,
    private modalController: ModalController,
    private location: Location, 
    private changeDetectorRef: ChangeDetectorRef ,
    ) { }
  
 closeAlert(){
  this.modalController.dismiss();
 }
async showModal() {
  const modal = await this.modalController.create({
    component: ShoppingCartPage,
    cssClass: 'alert-modal',
  });
  return await modal.present();
}
getCartDetails:any=[];
CartDetails(){
 if(localStorage.getItem('localCart')){
   this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '[]') 
   this.numberOfItems = this.getCartDetails.length;
 }
 this.CartService.cartSubject.next(this.cartNumber);
  
}
  incProduct(prod: any) {
    prod.productQuantityAddDefault += 1
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.updateSubTotal();
  }

  decProduct(prod: Cart) {
    if (prod.productQuantityAddDefault > 1) {
      prod.productQuantityAddDefault -= 1;
      localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    } else if (prod.productQuantityAddDefault === 1) {
      prod.productQuantityAddDefault = 0;
      this.getCartDetails = this.getCartDetails.filter((item: Cart) => item !== prod);
      this.numberOfItems = this.getCartDetails.length;
      localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
      this.updateSubTotal();
    }
  }
  updateSubTotal() {
    this.subTotalAmount = this.subTotal();
    this.changeDetectorRef.detectChanges();
    
  }

  subTotal(): number {
    let subTotal = 0;
    for (const product of this.getCartDetails) {
      subTotal += product.originalPrice * product.productQuantityAddDefault;
    }
    return subTotal;
  }

  delProduct(){
    this.getCartDetails.length = 0;
    this.numberOfItems = 0;
    this.updateSubTotal();
    this.modalController.dismiss();
    localStorage.removeItem('localCart');
    this.updateSubTotal()
  }
  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = localStorage.getItem('localCart');
    if (cartValue !== null) {
      this.cartNumber = cartValue.length;
      this.CartService.cartSubject.next(this.cartNumber);
    } else {
      this.cartNumber = 0;
    }
  }
 
  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
    
  }
}