import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/shared/models/ProductItem';
import { StoreService } from 'src/app/services/store.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ShoppingCartPage } from 'src/app/modules/shopping-cart/shopping-cart.page';

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
  public user: any;
  checkExistItem: boolean = true;
  cartItems: any[] = [];
  strapiId!: string;
  isConditionTrue: boolean = false;
  public UserIdCurrent: any;
  public productRender: any;
  public productOrdered: any;
  public forEachSaveProductId: any
  public forEachStrapiId: any
  public getStrapiIdDelete: any
  public itemID!: number;
  saveItemCart: any = [];
  public renderStrapiId: any;
  public saveRenderStrapiId: any;
 
  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
    private modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private productService: StoreService,
    private userService: UserService,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    this.getProductRender();
    this.getUserData();
    const initializationCart = localStorage.getItem(`${this.UserIdCurrent}`);
    this.renderStrapiId = initializationCart? JSON.parse(initializationCart): [];
    this.checkIdLocalAgainAfterDeleteOnStrapi();
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

  navigateToProductDetail(item: any) {
    this.router.navigate([
      'product-detail/',
      item.attributes.ProductName,
      item.attributes.ProductId,
    ]);
  }

  navigateToProductAll() {
    this.router.navigate(['product-all/']);
  }

  subTotal(): number {
    let subTotal = 0;
    for (const product of this.productData) {
      subTotal += product.Old_Price * product.productQuantityAddDefault;
    }
    return subTotal;
  }

  redirectToProductDetail(event: Event, item: any) {
    event.stopPropagation();
    this.navigateToProductDetail(item);
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

  async getProductRender() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.productService.getProducts().subscribe(
      (res: any) => {
        loading.dismiss();
        this.productData = res.data.map((item: any) => item);
        console.log('Product lists:', this.productData);
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  async addProduct(event: Event, item: any) {
    if (this.user !== undefined && this.user !== null) {
    event.stopPropagation();
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
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
        loading.dismiss(); 
        console.log("add to cart at product list")
        const strapiId = response.data.id;
        const saveProductId = response.data.attributes.ProductId;
        const savedCartItemsString = localStorage.getItem(`${this.UserIdCurrent}`);
        const existingCartItems = savedCartItemsString? JSON.parse(savedCartItemsString): [];
        existingCartItems.push({ ...item, strapiId, saveProductId });
        localStorage.setItem(`${this.UserIdCurrent}`,JSON.stringify(existingCartItems));
        this.renderStrapiId = existingCartItems;
      },
      (error) => {
        loading.dismiss();
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

  isProductInCart(item: number): boolean{
    if (this.user !== undefined && this.user !== null) {
      let cartData = JSON.parse(localStorage.getItem(`${this.UserIdCurrent}`) || '[]')
      return cartData.some((product: any) => product.saveProductId === item)
    } else {
      return false;
    }
  }

  async cancelProduct(event: Event, item: any) {
    event.stopPropagation();
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    const cartItem = this.renderStrapiId.find((cart: any) => cart.saveProductId === item.attributes.ProductId);
    if (cartItem) {
      const strapiIdToDelete = cartItem.strapiId;
      if (strapiIdToDelete) {
        this.CartService.deleteProduct(strapiIdToDelete).subscribe(
          (response) => {
            loading.dismiss();
            console.log("delete item success")
            this.renderStrapiId = this.renderStrapiId.filter((cart: any) => cart.saveProductId !== item.attributes.ProductId);
            localStorage.setItem(`${this.UserIdCurrent}`, JSON.stringify(this.renderStrapiId));
          },
          (error) => {
            console.error('Error deleting product from cart:', error);
          }
        );
      } else {
        loading.dismiss();
        console.error('Strapi ID is not available. Unable to delete product.');
      }
    } else {
      loading.dismiss();
      console.error('CartItem not found in renderStrapiId.');
    }
  }


  checkUser(): boolean {
    if (this.user !== undefined && this.user !== null) {
      return true;
    } else {
      return false;
    }
  }
}
