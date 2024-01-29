import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Cart } from 'src/app/shared/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  CartItem = '';
  tax = 65000;
  checkItemsCart: boolean = false;
  public _numberOfItems: number | undefined;
  alerCtrl: any;
  message = 'Nhập mã giảm giá';
  name: string | undefined;
  getCartDetails: any = [];
  public user: any;
  public currentStore: any;
  public productRender: any = [];
  itemLocalJSON: any = [];

  constructor(
    private CartService: CartService,
    private modalController: ModalController,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getCurrentStore();
    this.readLocalStorageCart();
    this.renderCartDetail();
    // this.checkUser();
    this.postItemToStrapi();
  }

  getUserData() {
    this.userService.getUserData().subscribe((res) => (this.user = res?.user));
  }

  getCurrentStore() {
    this.storeService.getCurrentStoreAddress().subscribe(
      (res: any) => {
        this.currentStore = res?.data[0]?.attributes;
        // console.log('find store', this.currentStore);
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  checkInput() {
    if (this.name !== '' && this.name !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `${ev.detail.data}`;
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onInput(even: any) {}

  ionViewWillEnter() {
    this.CartDetails();
    this.checkItemsCart;
    this.calculateItem;
    this.readLocalStorageCart();
    this.postItemToStrapi();
  }

  readLocalStorageCart() {
    var cartValue = localStorage.getItem('localCart');
    if (cartValue !== null) {
      this.getCartDetails = JSON.parse(cartValue);
      this.numberOfItems = this.getCartDetails.length;
      this.updateSubTotal();
    }
  }

  private calculateItem(numberOfItems: number | undefined): boolean {
    if (numberOfItems === 0) {
      return false;
    } else {
      return true;
    }
  }

  get numberOfItems(): number | undefined {
    return this._numberOfItems;
  }

  set numberOfItems(value: number | undefined) {
    this._numberOfItems = value;
    this.checkItemsCart = this.calculateItem(value);
  }
  subTotalAmount: number | undefined;

  async showModal() {
    const modal = await this.modalController.create({
      component: ShoppingCartPage,
      cssClass: 'alert-modal',
    });
    return await modal.present();
  }

  CartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(
        localStorage.getItem('localCart') || '[]'
      );
      this.numberOfItems = this.getCartDetails.length;
    }
  }
  incProduct(prod: any) {
    prod.productQuantityAddDefault += 1;
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.updateSubTotal();
  }

  decProduct(prod: Cart) {
    if (prod.productQuantityAddDefault > 1) {
      prod.productQuantityAddDefault -= 1;
      localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    } else if (prod.productQuantityAddDefault === 1) {
      prod.productQuantityAddDefault = 0;
      this.getCartDetails = this.getCartDetails.filter(
        (item: Cart) => item !== prod
      );
      this.numberOfItems = this.getCartDetails.length;
      localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
      this.updateSubTotal();
    }
  }

  delAllProductAPI() {
    const delProduct = this.productRender;
    const idProduct = delProduct.map((item: { id: any }) => item.id);
    idProduct.forEach((id: any) => {
      this.CartService.deleteAll(id).subscribe(
        (response) => {
          console.log('Product deleted from cart successfully:', response);
          window.location.reload();
          this.modalController.dismiss();
        },
        (error) => {
          console.error('Error deleting product from cart:', error);
        }
      );
    });
  }
  
  delAllProduct() {
    this.getCartDetails.length = 0;
    this.numberOfItems = 0;
    this.modalController.dismiss();
    this.updateSubTotal();
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
  }

  updateSubTotal() {
    this.subTotalAmount = this.subTotal();
    this.changeDetectorRef.detectChanges();
  }

  subTotal(): number {
    let subTotal = 0;
    for (const product of this.getCartDetails) {
      subTotal += product.ProductPrice * product.productQuantityAddDefault;
    }
    return subTotal;
  }

  subTotalAPI(): number {
    let totalPrice = 0;
    for (const product of this.productRender) {
      totalPrice +=
        product.attributes.ProductPrice *
        product.attributes.productQuantityAddDefault;
    }
    return totalPrice;
  }

  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
  }
  checkout() {
    this.router.navigate(['./login']);
    this.modalController.dismiss();
  }
  
  renderCartDetail() {
    this.CartService.getProductsCart().subscribe(
      (res: any) => {
        const groupedProducts = this.groupProducts(res.data);
        this.productRender = groupedProducts;
        console.log('Cart list API', this.productRender);
      },
      (err: any) => {
        console.log('Error Cart list API:', err);
      }
    );
  }

  groupProducts(products: any[]): any[] {
    const groupedProducts: any[] = [];
  
    products.forEach((product) => {
      const existingProduct = groupedProducts.find((data) => data.attributes.ProductId === product.attributes.ProductId);
  
      if (existingProduct) {
        existingProduct.attributes.productQuantityAddDefault += 1;
      } else {
        groupedProducts.push({ ...product, productQuantityAddDefault: 1 });
      }
    });
  
    return groupedProducts;
  }

  incProductAPI(prod: any) {
    prod.attributes.productQuantityAddDefault += 1;
    const productData = {
      id: prod.id,
      productQuantityAddDefault: prod.attributes.productQuantityAddDefault,
    };
    this.CartService.increaseItem(productData).subscribe(
      (res) => {
        console.log('Increase Item Success ', res);
      },
      (err) => {
        console.log('Error increase item:', err);
      }
    );
  }

  decProductAPI(prod: any) {
    if (prod.attributes.productQuantityAddDefault == 1) {
      const productData = {
        id: prod.id,
      };
      this.CartService.deleteItem(productData).subscribe(
        (res: any) => {
          console.log('Delete Item Success ', res);
        },
        (err: any) => {
          console.log('Error delete Item Success ', err);
        }
      );
      window.location.reload();
    } else if (prod.attributes.productQuantityAddDefault > 1) {
      prod.attributes.productQuantityAddDefault -= 1;
      const productData = {
        id: prod.id,
        productQuantityAddDefault: prod.attributes.productQuantityAddDefault,
      };
      console.log('prod incrase:', prod);
      this.CartService.increaseItem(productData).subscribe(
        (res) => {
          console.log('Decrease Item Success ', res);
        },
        (err) => {
          console.log('Error Decrease item:', err);
        }
      );
    }
  }

  postItemToStrapi() {
    if (this.user !== undefined) {
      const itemsLocal = JSON.parse(localStorage.getItem('localCart') || '[]');
      if (itemsLocal.length > 0) {
        let succesfulRequest = 0
        const checkComplete = () => {
          succesfulRequest++
          if(succesfulRequest === itemsLocal.length){
            window.location.reload();
          }
        }
        itemsLocal.forEach(
          (item: {
            ProductName: any;
            ProductPrice: any;
            productQuantityAddDefault: any;
            ProductImage: any;
            ProductId: any;
          }) => {
            const productData = {
              ProductName: item.ProductName,
              ProductPrice: item.ProductPrice,
              productQuantityAddDefault: item.productQuantityAddDefault,
              ProductImage: item.ProductImage,
              ProductId: item.ProductId,
            };
            this.CartService.postProductsAPI(productData).subscribe(
              (res: any) => {
                console.log('Post Successful Local to Strapi:', res);
                localStorage.removeItem('localCart');
                checkComplete();
              },
              (err: any) => {
                console.log('Post Failed Local to Strapi:', err);
                checkComplete();
              }
            );
          },
        );
      } else {
        console.log('No items found in local storage.');
      }
     
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