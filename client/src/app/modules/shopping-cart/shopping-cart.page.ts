import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Cart } from 'src/app/shared/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],

})

export class ShoppingCartPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  CartItem = ''
  tax = 65000
  checkItemsCart: boolean = false;
  public _numberOfItems: number | undefined;
  alerCtrl: any;
  message = 'Nhập mã giảm giá';
  name: string | undefined;
  public user: any;
  public currentStore: any;
  groupedCartItems: any[] = [];
  cartItems: any;
  
  constructor(
    private CartService: CartService,
    private modalController: ModalController,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private storeService: StoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserData()
    this.getCurrentStore()
    this.readLocalStorageCart();
    this.renderProductsCart();
    // this.groupByProductName;
    this.groupedCartItems;
  }


  getUserData() {
    this.userService.getUserData().subscribe(res => this.user = res?.user);
  }
 
  // renderProductsCart() {
  //   this.CartService.getProductsCart().subscribe(
  //     (res: any) => {
  //        this.cartItems = res.data.map((item: any) => item);
  
  //       // this.groupedCartItems = this.groupByProductName(cartItems);
  
  //       console.log("Grouped cart items:", this.cartItems);
        
  //     },
  //     (err) => {
  //       console.error('Error fetching current store data:', err);
  //     }
  //   );
  // }
  
  renderProductsCart() {
    this.CartService.getProductsCart().subscribe(
      (res: any) => {
        this.cartItems = res.data
        // .filter((itemsCart: any) => itemsCart.attributes.UserId === 2)
        .map((item: any) => item);
          console.log("Grouped cart items:", this.cartItems);
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }
  
  // groupByProductName(cartItems: any[]): any[] {
  //   const groupedItems: any[] = [];
  
  //   cartItems.forEach((item) => {
  //     const existingItem = groupedItems.find((groupedItem) => groupedItem.ProductName === item.ProductName);
  //     if (existingItem) {
  //       existingItem.QuantityDefault += item.QuantityDefault;
  //     } else {
  //       groupedItems.push(item);
  //     }
  //   });
  
  //   return groupedItems;
  // }
  
  getCurrentStore() {
    this.storeService.getCurrentStoreAddress().subscribe(
      (res: any) => {
        this.currentStore = res?.data[0]?.attributes;
        console.log("find store", this.currentStore)
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  checkInput() {
    if (this.name !== '' && this.name !== undefined) {
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

  onInput(even: any) {

  }

  ionViewWillEnter() {
    this.CartDetails()
    this.checkItemsCart
    this.calculateItem
    this.renderProductsCart();
  }

  readLocalStorageCart() {
    var cartValue = localStorage.getItem('localCart');
    if (cartValue !== null) {
      // this.getCartDetails = JSON.parse(cartValue);
      this.numberOfItems = this.groupedCartItems.length;
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

  async showModal() {
    const modal = await this.modalController.create({
      component: ShoppingCartPage,
      cssClass: 'alert-modal',
    });
    return await modal.present();
  }

  CartDetails() {
      // this.getCartDetails = this.groupedCartItems
      this.numberOfItems = this.groupedCartItems.length;
  }
  
  incProduct(prod: any) {
    prod.QuantityDefault += 1
    this.updateSubTotal();
  }

  decProduct(prod: any) {
    if (prod.QuantityDefault > 1) {
      prod.QuantityDefault -= 1;
    } else if (prod.QuantityDefault === 1) {
      prod.QuantityDefault = 0;
      this.groupedCartItems = this.groupedCartItems.filter((item: Cart) => item !== prod);
      this.numberOfItems = this.groupedCartItems.length;
      this.updateSubTotal();
    }
  }

  delProduct() {
    this.groupedCartItems.length = 0;
    this.numberOfItems = 0;
    this.modalController.dismiss();
    this.updateSubTotal()
    localStorage.setItem('localCart', JSON.stringify(this.groupedCartItems));
  }

  updateSubTotal() {
    this.subTotalAmount = this.subTotal();
    this.changeDetectorRef.detectChanges();

  }

  subTotal(): number {
    let subTotal = 0;
    for (const product of this.groupedCartItems) {
      subTotal += product.ProductPrice * product.QuantityDefault;
    }
    return subTotal;
  }

  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();

  }
checkout(){
  this.router.navigate(['./checkout-order'])
}



}