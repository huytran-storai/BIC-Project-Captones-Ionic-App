import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { ProductItem } from 'src/app/shared/models/ProductItem';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NavController,AlertController,ModalController } from '@ionic/angular';
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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.items = this.StoreService.getAllProducts();
    this.getProductRender()
    this.getUserData();
    const initializationCart = localStorage.getItem('saveCartItems');
    this.renderStrapiId = initializationCart? JSON.parse(initializationCart): [];
    this.checkIdLocalAgainAfterDeleteOnStrapi();
  }

  checkIdLocalAgainAfterDeleteOnStrapi() {
    this.CartService.getProductsCart().subscribe(
      (res: any) => {
        this.productRender = res.data.map((item: any) => item);
        this.productOrdered = this.productRender.map((item: any) => item.id );
        let getIdItemCart = this.renderStrapiId.filter((value : any) => this.productOrdered.includes(value.strapiId))
        localStorage.setItem('saveCartItems', JSON.stringify(getIdItemCart));
      },
      (err: any) => {
        console.log('Error Cart list API:', err);
      }
    );
  }

  getUserData() {
    this.userService.getUserData().subscribe(
      (res) => {
        this.user = res?.user;
        console.log('find user: ', this.user);
        this.UserIdCurrent = this.user.UserId;
        console.log('find UserIdCurrent: ', this.UserIdCurrent);
      },
      (error) => {
        console.log('Get user data error', error);
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
        const savedCartItemsString = localStorage.getItem('saveCartItems');
        const existingCartItems = savedCartItemsString? JSON.parse(savedCartItemsString): [];
        existingCartItems.push({ ...item, strapiId, saveProductId });
        localStorage.setItem('saveCartItems',JSON.stringify(existingCartItems));
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

  cancelProduct(event: Event, item: any) {
    event.stopPropagation();
    // console.log('this.renderStrapiId in cancel button', this.renderStrapiId);
    const cartItem = this.renderStrapiId.find((cart: any) => cart.saveProductId === item.attributes.ProductId);
    if (cartItem) {
      const strapiIdToDelete = cartItem.strapiId;
      // console.log('strapiIdToDelete:', strapiIdToDelete);
      if (strapiIdToDelete) {
        this.CartService.deleteProduct(strapiIdToDelete).subscribe(
          (response) => {
            // console.log('Product deleted from cart successfully:', response);
            this.renderStrapiId = this.renderStrapiId.filter((cart: any) => cart.saveProductId !== item.attributes.ProductId);
            localStorage.setItem('saveCartItems', JSON.stringify(this.renderStrapiId));
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


  isProductInCart(item: number): boolean{
    if (this.user !== undefined && this.user !== null) {
      let cartData = JSON.parse(localStorage.getItem('saveCartItems') || '[]')
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
  
  getProductRender() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productData = res.data.map((item: any) => item);
        console.log('Product lists:', this.productData);
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }


}
