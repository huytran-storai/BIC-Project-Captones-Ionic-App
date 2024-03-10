import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
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
  id: any;
  public user: any
  public UserIdCurrent: any;
  public renderStrapiId: any; 
  public productRender: any;
  public productOrdered: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['ProductId'];
      console.log('===>', this.productId);
      this.getProductRender();
    });
    const initializationCart = localStorage.getItem(`${this.UserIdCurrent}`);
    this.renderStrapiId = initializationCart? JSON.parse(initializationCart): [];
    this.checkIdLocalAgainAfterDeleteOnStrapi();
    this.getUserData();
  }

  checkIdLocalAgainAfterDeleteOnStrapi() {
    this.CartService.getProductsCart().subscribe(
      (res: any) => {
        this.productRender = res.data.map((item: any) => item);
        this.productOrdered = this.productRender.map((item: any) => item.id );
        let getIdItemCart = this.renderStrapiId.filter((value : any) => this.productOrdered.includes(value.strapiId))
        localStorage.setItem(`${this.UserIdCurrent}`, JSON.stringify(getIdItemCart));
      },
      (err: any) => {
        console.log('Error Cart list API:', err);
      }
    );
  }

  constructor(
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private CartService: CartService,
    private navCtrl: NavController,
    private productService: StoreService,
    private userService: UserService,
    public alertController: AlertController,
  ) {}
  Back() {
    this.navCtrl.back();
  }


  getUserData() {
    this.userService.getUserData().subscribe(
      (res) => {
        this.user = res?.user;
        if(this.user){
          this.UserIdCurrent = this.user.id;
        } else {
          console.log('User data is undefined or null');
        }
      },
      (error) => {
        console.log('Get user data error', error);
      }
    );
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

  itemCart: any = [];

  // addProduct(productInfor: any) {
  //   this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
  //   this.itemCart.push(productInfor);
  //   localStorage.setItem('localCart', JSON.stringify(this.itemCart));
  // }

  addProduct(event: Event, item: any) {
    if (this.user !== undefined && this.user !== null) {
    event.stopPropagation();
    const productData = {
      ProductName: item.attributes.ProductName,
      ProductPrice: item.attributes.ProductPrice,
      QuantityDefault: 1,
      ProductImage: item.attributes.ProductImage,
      ProductId: item.attributes.ProductId,
      OrderedUserId: this.UserIdCurrent,
    };
    this.CartService.pushProducts(productData).subscribe(
      (response) => {
        const strapiId = response.data.id;
        const saveProductId = response.data.attributes.ProductId;
        const savedCartItemsString = localStorage.getItem(`${this.UserIdCurrent}`);
        const existingCartItems = savedCartItemsString? JSON.parse(savedCartItemsString): [];
        existingCartItems.push({ ...item, strapiId, saveProductId });
        localStorage.setItem(`${this.UserIdCurrent}`,JSON.stringify(existingCartItems));
        this.renderStrapiId = existingCartItems;
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
    }
    else {
      event.stopPropagation();
      this.alertController
        .create({
          header: 'Thông báo',
          message: 'Vui lòng đăng nhập để thêm sản phẩm',
          buttons: [
            {
              text: 'Đăng nhập',
              handler: () => {
                this.modalController.dismiss();
                this.router.navigate(['./login']);
                setTimeout(() => {
                  window.location.reload();
                }, 0);
              },
            },
          ],
        })
        .then((alert) => {
          alert.present();
        });
    }
  }

  isProductInCart(productInfor: number): boolean{
    if (this.user !== undefined && this.user !== null) {
      let cartData = JSON.parse(localStorage.getItem(`${this.UserIdCurrent}`) || '[]')
      return cartData.some((product: any) => product.saveProductId === productInfor)
    } else {
      return false;
    }
  }

  cancelProduct(event: Event, item: any) {
    event.stopPropagation();
    const cartItem = this.renderStrapiId.find((cart: any) => cart.saveProductId === item.ProductId);
    if (cartItem) {
      const strapiIdToDelete = cartItem.strapiId;
      if (strapiIdToDelete) {
        this.CartService.deleteProduct(strapiIdToDelete).subscribe(
          (response) => {
            this.renderStrapiId = this.renderStrapiId.filter((cart: any) => cart.saveProductId !== item.ProductId);
            localStorage.setItem(`${this.UserIdCurrent}`, JSON.stringify(this.renderStrapiId));
          },
          (error) => {
            console.error('Error deleting product from cart:', error);
          }
        );
      } else {
        console.error('Strapi ID is not available. Unable to delete product.');
      }
    } else {
      console.error('CartItem not found in renderStrapiId.');
    }
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

  getProductRender() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productDetail = res.data.map((item: any) => item);
        console.log('Product lists:', this.productDetail);

        this.productInfor = this.productDetail.find(
          (product: any) => product.attributes.ProductId === this.productId
        );
        if (this.productInfor) {
          console.log('Product Information:', this.productInfor);
        } else {
          console.error('Product not found!');
        }
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }
}
