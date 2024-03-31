import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { ProductItem } from 'src/app/shared/models/ProductItem';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NavController,AlertController,ModalController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.page.html',
  styleUrls: ['./filter-result.page.scss'],
})
export class FilterResultPage implements OnInit {
  items: ProductItem[] = [];
  public productData: any;
  public user: any;
  public UserIdCurrent: any;
  public renderStrapiId: any;
  public productRender: any;
  public productOrdered: any;

  constructor(
    private StoreService: StoreService,
    private router: Router,
    private CartService: CartService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private modalController: ModalController,
    private productService: StoreService,
    private userService: UserService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.items = this.StoreService.getAllProducts();
    this.getProductRender()
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
          this.UserIdCurrent = this.user.id
        } else {
          console.log('User data is undefined or null');
        }
      },
      (error) => {
        loading.dismiss();
        console.log('Error get user data:', error);
      }
    );
  }

  Back(){
    this.navCtrl.back()
  }

  navigateToProductDetail(items: any) {
    this.router.navigate(['product-detail/', items.attributes.ProductName,items.attributes.ProductId]); 
  }

  itemCart:any = []
  async addProduct(event: Event, item: any) {
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
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
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
            loading.dismiss();
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


}
