import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isDropdownOpenNutrition = false;

  toggleDropdownNutrition() {
    this.isDropdownOpenNutrition = !this.isDropdownOpenNutrition;
  }

  isDropdownOpenProductInfor = false;

  toggleDropdownProductInfor() {
    this.isDropdownOpenProductInfor = !this.isDropdownOpenProductInfor;
  }

  isDropdownOpenDisclaimer = false;

  toggleDropdownDisclaimer() {
    this.isDropdownOpenDisclaimer = !this.isDropdownOpenDisclaimer;
  }
  addSugar(product: any) {
    product.addedSugar = !product.addedSugar;
  }

  @Input() product: any;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private CartService: CartService,
  ) { }

  checkAdded(product: any): boolean {
    const productId = product.id;
    this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    let isConditionTrue = false; // Mặc định là false
  
    for (let i = 0; i < this.itemCart.length; i++) {
      if (parseInt(productId) === parseInt(this.itemCart[i].id)) {
        isConditionTrue = true;
        break;
      }
    }
  
    return isConditionTrue; // Trả về kết quả boolean
  }

  itemCart:any = []
  addProduct(store: any){
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null) {
      let storeDataGet:any =[]
      storeDataGet.push(store)
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var productId = store.id;
      let index:number = -1;
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      for(let i = 0 ; i < this.itemCart.length; i++){
        if(parseInt(productId) === parseInt(this.itemCart[i].id)){
          this.itemCart[i].productQuantityAddDefault += store.productQuantityAddDefault
          index = i;
          break; 
        }
      }
      if(index == -1){
        this.itemCart.push(store)
        localStorage.setItem('localCart', JSON.stringify(this.itemCart))
      }
      else{
        localStorage.setItem('localCart', JSON.stringify(this.itemCart))
      }
    }
    this.cartNumberFunc();
   
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
  ngOnInit() { }

  async closeModalAndNavigateToCart() {
    await this.modalController.dismiss();
    this.router.navigate(['/shopping-cart']);
  }
}
