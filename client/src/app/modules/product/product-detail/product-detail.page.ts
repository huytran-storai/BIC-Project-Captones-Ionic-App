import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  productInfor: any;
  productDetail: any;
  public productData: any;
  productId: any;
  @Input() product: any;
  ProductId: any;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['ProductId']; 
      this.getProductRenderDetail(this.productId);
    });
  }
  

  constructor(
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private CartService: CartService,
    private storeService: StoreService,
    private navCtrl: NavController,
    private productService: StoreService,

  ) { }
  Back() {
    this.navCtrl.back()
  }

  

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

  itemCart: any = []

  addProduct(item: any) {
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


  async closeModalAndNavigateToCart() {
    await this.modalController.dismiss();
    this.router.navigate(['/shopping-cart']);
  }

  getProductRenderDetail(ProductId: any) {
    console.log("ID", ProductId);
    this.productService.getProductById(ProductId).subscribe(
      (res: any) => {
        // Kiểm tra nếu res.data là một đối tượng
        (res.data && typeof res.data === 'object')
          this.productDetail = res.data.attributes;
          console.log("Product Detail:", this.productDetail);
      },
      (err: any) => {
        console.error('Lỗi data api:', err);
      }
    );
  }

}
