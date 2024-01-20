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
        this.productData = res.data.map((item: any) => item.attributes);
        console.log("Product lists:", this.productData)
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  navigateToProductDetail(item: any) {
    this.router.navigate(['product-detail/', item.ProductName,item.ProductId]);
  }

  Back() {
    this.navCtrl.back()
  }

  redirectToProductDetail(event: Event, items: any) {
    event.stopPropagation();
    this.navigateToProductDetail(items);
  }

  itemCart: any = []
  addProduct(event: Event, item: any) {
    event.stopPropagation();
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
        this.itemCart.push(item)
        localStorage.setItem('localCart', JSON.stringify(this.itemCart))
    this.cartNumberFunc();

  }
  cancelProduct(event: Event,item: any){
    event.stopPropagation();
    let cartData = JSON.parse(localStorage.getItem('localCart') || '[]')
    cartData = cartData.filter((productDel: any) => productDel.ProductId !== item.ProductId)
    localStorage.setItem('localCart', JSON.stringify(cartData))
  }

  isProductInCart(item: number): boolean{
      let cartData = JSON.parse(localStorage.getItem('localCart') || '[]')
      return cartData.some((product: any) => product.ProductId === item)
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
