import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { ProductItem } from 'src/app/shared/models/ProductItem';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage implements OnInit {
  items: ProductItem[] = [];
  public productData: any;

  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
    private router: Router,
    private navCtrl: NavController,
    private productService: StoreService,

  ) { }

  ngOnInit() {
    // this.items = this.StoreService.getAllProducts();
    this.getProductRender();

  }
  getProductRender() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productData = res.data.map((item: any) => item);
        console.log("Product lists:", this.productData)
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  navigateToProductDetail(item: any) {
    this.router.navigate(['product-detail/', item.ProductName,item.id]);
  }

  Back() {
    this.navCtrl.back()
  }

  checkAdded(product: any): boolean {
    const productId = product.ProductId;
    this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    let isConditionTrue = false;

    for (let i = 0; i < this.itemCart.length; i++) {
      if (parseInt(productId) === parseInt(this.itemCart[i].ProductId)) {
        isConditionTrue = true;
        break;
      }
    }
    return isConditionTrue;
  }

  redirectToProductDetail(event: Event, items: any) {
    event.stopPropagation();
    this.navigateToProductDetail(items);
  }

  itemCart: any = []
  addProduct(event: Event, item: any) {
    event.stopPropagation();
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any = []
      storeDataGet.push(item)
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var productId = item.ProductId;
      let index: number = -1;
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      for (let i = 0; i < this.itemCart.length; i++) {
        if (parseInt(productId) === parseInt(this.itemCart[i].ProductId)) {
          this.itemCart[i].productQuantityAddDefault += item.productQuantityAddDefault
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemCart.push(item)
        localStorage.setItem('localCart', JSON.stringify(this.itemCart))
      }
      else {
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
