import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { modalController } from '@ionic/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-department-result',
  templateUrl: './department-result.page.html',
  styleUrls: ['./department-result.page.scss'],
})
export class DepartmentResultPage implements OnInit {
  tagName!: string;
  products: any[] = [];
  isModalOpen = false;
  selectedProduct: any;
  itemCart: any = [];
  public user: any;
  public UserIdCurrent: any;
  public productData: any;
  productResult: any[] = [];
  public renderStrapiId: any;
  public productRender: any;
  public productOrdered: any;

  constructor(
    private route: ActivatedRoute,
    private productService: StoreService,
    private router: Router,
    private userService: UserService,
    private CartService: CartService,
    private modalController: ModalController,
    public alertController: AlertController,
    private loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.renderProductResult();
    this.checkIdLocalAgainAfterDeleteOnStrapi();
    this.getUserData();
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

  async renderProductResult() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.productService.getProducts().subscribe(
      (res: any) => {
        loading.dismiss();
        this.route.params.subscribe((params) => {
          this.tagName = params['tagName'];
        });
        this.productData = res.data.map((item: any) => item);
        if (this.productData && this.productData.length > 0) {
          this.productResult = this.productData.filter((product: any) => {
            return product.attributes.DrinkType === this.tagName;
          });
        } else {
          console.log('No data');
        }
      },
      (err: any) => {
        loading.dismiss();
      }
    );
  }


  navigateToProductDetail(item: any) {
    this.router.navigate(['product-detail/', item.attributes.ProductName,item.attributes.ProductId]);
  }

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

}
