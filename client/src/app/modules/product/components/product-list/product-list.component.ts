import { Component, Input, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/shared/models/ProductItem';
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
  items: ProductItem[] = [];
  isModalOpen = false;
  selectedProduct: any;
  isModalViewAllProductOpen = false;
  public _numberOfItems: number | undefined;
  itemCart: any = [];
  public productData: any;

  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
    private modalController: ModalController,
    private router: Router,
    private productService: StoreService,
  ) {
  }

  ngOnInit(): void {
    this.items = this.StoreService.getAllProducts();
    this.getProductRender();

  }

  navigateToProductDetail(item: any) {
    this.router.navigate(['product-detail/', item.id]);
  }

  navigateToProductAll() {
    this.router.navigate(['product-all/',]);
  }

  subTotal(): number {
    let subTotal = 0;
    for (const product of this.items) {
      subTotal += product.originalPrice * product.productQuantityAddDefault;
    }
    return subTotal;
  }

  checkAdded(item: any): boolean {
    const productId = item.id;
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

  redirectToProductDetail(event: Event, item: any) {
    event.stopPropagation();
    this.navigateToProductDetail(item);
  }

  isConditionTrue: boolean = false;
  addProduct(event: Event, item: any) {
    event.stopPropagation();
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any = []
      storeDataGet.push(item)
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var productId = item.id;
      let index: number = -1;
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      for (let i = 0; i < this.itemCart.length; i++) {
        if (parseInt(productId) === parseInt(this.itemCart[i].id)) {
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

  }

  getProductRender() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productData = res?.data[0]?.attributes;
        console.log("find store", this.productData)
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

}
