import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,AlertController, ModalController, LoadingController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { ProductItem } from 'src/app/shared/models/ProductItem';
@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage implements OnInit {
  items: ProductItem[] = [];
  public productData: any;
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
  public user: any;

  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
    private router: Router,
    private navCtrl: NavController,
    private productService: StoreService,
    private userService: UserService,
    public alertController: AlertController,
    private modalController: ModalController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    // this.items = this.StoreService.getAllProducts();
    this.getProductRender();
    this.getUserData();
    const initializationCart = localStorage.getItem(`${this.user.id}`);
    this.renderStrapiId = initializationCart? JSON.parse(initializationCart): [];
    this.checkIdLocalAgainAfterDeleteOnStrapi();
  }

  checkIdLocalAgainAfterDeleteOnStrapi() {
    this.CartService.getProductsCart().subscribe(
      (res: any) => {
        this.productRender = res.data.map((item: any) => item);
        this.productOrdered = this.productRender.map((item: any) => item.id );
        let getIdItemCart = this.renderStrapiId.filter((value : any) => this.productOrdered.includes(value.strapiId))
        localStorage.setItem(`${this.user.id}`, JSON.stringify(getIdItemCart));
      },
      (err: any) => {
        console.log('Error Cart list API:', err);
      }
    );
  }

  async getUserData() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.userService.getUserData().subscribe(
      (res) => {
        loading.dismiss();
        this.user = res?.user;
        if(this.user){
          this.UserIdCurrent = this.user.id;
        } else {
          loading.dismiss();
          console.log('find UserIdCurrent: ', this.UserIdCurrent);
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
        loading.dismiss();
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
        const strapiId = response.data.id;
        const saveProductId = response.data.attributes.ProductId;
        const savedCartItemsString = localStorage.getItem(`${this.user.id}`);
        const existingCartItems = savedCartItemsString? JSON.parse(savedCartItemsString): [];
        existingCartItems.push({ ...item, strapiId, saveProductId });
        localStorage.setItem(`${this.user.id}`,JSON.stringify(existingCartItems));
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
            this.renderStrapiId = this.renderStrapiId.filter((cart: any) => cart.saveProductId !== item.attributes.ProductId);
            localStorage.setItem(`${this.user.id}`, JSON.stringify(this.renderStrapiId));
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
      console.error('CartItem not found in renderStrapiId.');
    }
  }

  isProductInCart(item: number): boolean{
    if (this.user !== undefined && this.user !== null) {
      let cartData = JSON.parse(localStorage.getItem(`${this.user.id}`) || '[]')
      return cartData.some((product: any) => product.saveProductId === item)
    } else {
      return false;
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


}
