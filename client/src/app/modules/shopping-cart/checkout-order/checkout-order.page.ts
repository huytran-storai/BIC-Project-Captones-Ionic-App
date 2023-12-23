import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal,ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.page.html',
  styleUrls: ['./checkout-order.page.scss'],
})
export class CheckOutOrderPage implements OnInit {
  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '8', '4', ' ', '(', /\d/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
  cartItems: any[] = []; 
  pickupChecked: boolean = true;
  deliveryChecked: boolean = false;
  payOnline: boolean = false;
  payAfter: boolean = true;
  currentDate: string;
  modal!: IonModal;
  message = 'Add Promo Code';
  name: string | undefined;
  public _numberOfItems: number | undefined;
  checkItemsCart: boolean = false;
  public currentStore: any;
  public user: any;
  tax = 65000;
  deliveryFee: number = 0;
  contactInfo: any = {};
  newFirstName: string = '';
  newLastName: string = '';
  newAddress: string = '';
  newPhone: string = '';

  constructor(
    private location: Location,
    private modalController: ModalController,
    private storeService: StoreService,
    private userService: UserService,
    private cartService: CartService
    
    ) { 
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; 
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    this.currentDate = `${year}-${this.formatTime(month)}-${this.formatTime(day)}T${this.formatTime(hour)}:${this.formatTime(minute)}`;
    }

    formatTime(value: number): string {
     // Chuyển thời gian từ 1 thành 2 số
      return value < 10 ? `0${value}` : `${value}`;
    }

    updateContact() {
      this.contactInfo.firstName = this.newFirstName; 
      this.contactInfo.lastName = this.newLastName; 
      this.contactInfo.address = this.newAddress; 
      this.contactInfo.phone = this.newPhone; 
      this.modalController.dismiss();
    }

    ionViewWillEnter() {
      this.CartDetails()
      this.checkItemsCart
      this.calculateItem
      this.loadCartItems();
    }

    ngOnInit() {
      this.loadCartItems();
    }
  
  
    loadCartItems() {
      this.cartItems = this.cartService.getCartItems(); // Lấy thông tin giỏ hàng từ service
    }

    getUserData() {
      this.userService.getUserData().subscribe(res => this.user = res?.user);
    }

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
    subTotal(): number {
      let subTotal = 0;
      for (const product of this.cartItems) {
        subTotal += product.price * product.productQuantityAddDefault;
      }
      return subTotal;
    }

    CartDetails() {
      if (localStorage.getItem('localCart')) {
        this.cartItems = JSON.parse(localStorage.getItem('localCart') || '[]')
        this.numberOfItems = this.cartItems.length;
      }
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
      this.modalController.dismiss(null, 'cancel');
    }
  
    confirm() {
      this.modalController.dismiss(this.name, 'confirm');
    }


    onCheckboxChangeOrder(type: 'pickup' | 'delivery') {
      if (type === 'pickup') {
        this.deliveryChecked = false;
        if (this.pickupChecked) {
          this.deliveryFee = 0; 
        }
      } else if (type === 'delivery') {
        this.pickupChecked = false;
        this.deliveryFee = 0;
        if (this.deliveryChecked) {
          this.deliveryFee = 50000; 
        }
      }
    }

  onCheckboxChangePayment(type: 'payonline' | 'payafter') {
    if (type === 'payonline') {
      this.payAfter = false;
    } else if (type === 'payafter') {
      this.payOnline = false;
    }
  }
  

  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
  }
  async showModal() {
    const modal = await this.modalController.create({
      component: CheckOutOrderPage,
      cssClass: 'alert-modal',
    });
    return await modal.present();
  }

  

}
