import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { ProductItem } from 'src/app/shared/models/ProductItem';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.page.html',
  styleUrls: ['./filter-result.page.scss'],
})
export class FilterResultPage implements OnInit {
  items: ProductItem[] = [];
  productData: any;

  constructor(
    private StoreService: StoreService,
    private router: Router,
    private CartService: CartService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.items = this.StoreService.getAllProducts();
    this.getProductRender()
  }

  Back(){
    this.navCtrl.back()
  }

  navigateToProductDetail(items: any) {
    this.router.navigate(['product-detail/', items.id]); 
  }

  itemCart:any = []
  addProduct(event: Event,items: any){
    event.stopPropagation();
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null) {
      let storeDataGet:any =[]
      storeDataGet.push(items)
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var productId = items.id;
      let index:number = -1;
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      for(let i = 0 ; i < this.itemCart.length; i++){
        if(parseInt(productId) === parseInt(this.itemCart[i].id)){
          this.itemCart[i].productQuantityAddDefault += items.productQuantityAddDefault
          index = i;
          break; 
        }
      }
      if(index == -1){
        this.itemCart.push(items)
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

  checkAdded(product: any): boolean {
    const productId = product.id;
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
  getProductRender() {
    this.StoreService.getProducts().subscribe(
      (res: any) => {
        this.productData = res.data.map((item: any) => item);
        console.log("Product lists:", this.productData)
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }


}
