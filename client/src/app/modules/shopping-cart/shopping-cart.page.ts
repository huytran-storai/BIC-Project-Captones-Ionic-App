import { Component, OnInit,ChangeDetectorRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Cart } from 'src/app/shared/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { InputCustomEvent } from '@ionic/angular';
import { CheckboxCustomEvent } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],

})

export class ShoppingCartPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  CartItem = ''
  tax = 0.65
  checkItemsCart : boolean = false;
  public _numberOfItems: number | undefined;
  alerCtrl: any;
  message = 'Add Promo Code';
  name: string | undefined;

  // named(inName: string | undefined){
  //   var name = inName
  //   if(inName !== undefined){
  //     return inName
  //   } else {
  //     return this.message
  //   }
  // }

  checkInput() {
    if (this.name !== '' &&  this.name !== undefined) {
      return true 
    } else {
      return false
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `${ev.detail.data}`;
    }
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  
  ngOnInit(): void {
    // this.CartDetails()
    
  
  }

 onInput(even : any){

 }
 ionViewWillEnter() {
    this.CartDetails()
    this.checkItemsCart
    this.calculateItem
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
  private calculateItem(numberOfItems: number | undefined): boolean {
    if (numberOfItems === 0) {
      return false;
    } else {
      return true;
    }
  }
  get numberOfItems(): number | undefined {
    return this._numberOfItems;
  }
  set numberOfItems(value: number | undefined) {
    this._numberOfItems = value;
    this.checkItemsCart = this.calculateItem(value);
  }
  subTotalAmount: number | undefined;
  constructor(private CartService: CartService,
    private modalController: ModalController,
    private location: Location, 
    private changeDetectorRef: ChangeDetectorRef ,
    ) { }
  

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

  delProduct(){
    this.getCartDetails.length = 0;
    this.numberOfItems = 0;
    this.modalController.dismiss();
    this.updateSubTotal()
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
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
 
  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
    
  }
  
}