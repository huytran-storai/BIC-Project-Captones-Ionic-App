import { Component, Input, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/shared/models/ProductItem';
import { StoreService } from 'src/app/services/store.service';
import { AlertController, ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getProductRender();
    this.getUserData();
    const initializationCart = localStorage.getItem('saveCartItems');
    this.renderStrapiId = initializationCart? JSON.parse(initializationCart): [];

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
        console.log('find user: ', this.user);
        this.UserIdCurrent = this.user.UserId;
        console.log('find UserIdCurrent: ', this.UserIdCurrent);
      },
      (error) => {
        console.log('Get user data error', error);
      }
    );
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
        window.location.reload();
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

  isProductInCart(item: number): boolean{
      let cartData = JSON.parse(localStorage.getItem('saveCartItems') || '[]')
      return cartData.some((product: any) => product.saveProductId === item)
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


  checkUser(): boolean {
    if (this.user !== undefined && this.user !== null) {
      return true;
    } else {
      return false;
    }
  }
}
