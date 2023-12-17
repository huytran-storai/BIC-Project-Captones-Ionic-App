import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/Store';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage implements OnInit {
  stores: Store[] = [];
  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
    private router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.stores = this.StoreService.getAll();
  }

  navigateToProductDetail(store: any) {
    this.router.navigate(['product-detail/', store.id]); 
  }

  Back(){
    this.navCtrl.back()
  }

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

  // Dùng để tách sự kiện Add với Navigate Detail Product
  redirectToProductDetail(event: Event, store: any) {
    event.stopPropagation();
    this.navigateToProductDetail(store);
  }

  itemCart:any = []
  addProduct(event: Event,store: any){
    event.stopPropagation();
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
}
