import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/models/Store';
import { StoreService } from 'src/app/services/store.service';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
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
  public _numberOfItems: number | undefined;
  itemCart:any = []

  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
     private modalController: ModalController,
     private router: Router
     ) {
  }
  
  ngOnInit(): void {
    this.stores = this.StoreService.getAll();
  }

  navigateToProductDetail(store: any) {
    this.router.navigate(['product-detail/', store.id]); 
  }

  navigateToProductAll() {
    this.router.navigate(['product-all/',]); 
  }

 
  subTotal(): number {
    let subTotal = 0;
    for (const product of this.stores) {
      subTotal += product.originalPrice * product.productQuantityAddDefault;
    }
    return subTotal;
  }
 
  checkAdded(store: any): boolean {
    const productId = store.id;
    this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    let isConditionTrue = false; 
  
    for (let i = 0; i < this.itemCart.length; i++) {
      if (parseInt(productId) === parseInt(this.itemCart[i].id)) {
        isConditionTrue = true;
        break;
      }
    }
  
    return isConditionTrue; 
  }


  redirectToProductDetail(event: Event, store: any) {
    event.stopPropagation();
    this.navigateToProductDetail(store);
  }


  isConditionTrue: boolean = false;
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
    
    
  }
  
  }
