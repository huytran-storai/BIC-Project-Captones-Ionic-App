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
    this.router.navigate(['product-detail/', items.ProductName,items.ProductId]); 
  }

  itemCart:any = []
  addProduct(event: Event,items: any){
    event.stopPropagation();
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
        this.itemCart.push(items)
        localStorage.setItem('localCart', JSON.stringify(this.itemCart))
  }
  cancelProduct(event: Event,items: any) {
    event.stopPropagation();
    let cartData = JSON.parse(localStorage.getItem('localCart') || '[]')
    cartData = cartData.filter((product: any) => product.ProductId !== items.ProductId)
    localStorage.setItem('localCart', JSON.stringify(cartData))
  }

  isProductInCart(productId: any): boolean {
    let cartData = JSON.parse(localStorage.getItem('localCart') || '[]')
    return cartData.some((product: any) => product.ProductId === productId)
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
  
  getProductRender() {
    this.StoreService.getProducts().subscribe(
      (res: any) => {
        this.productData = res.data.map((item: any) => item.attributes);
        console.log("Product lists:", this.productData)
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }


}
