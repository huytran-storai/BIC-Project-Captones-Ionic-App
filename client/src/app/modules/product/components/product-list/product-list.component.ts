import { Component, Input, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/shared/models/ProductItem';
import { StoreService } from 'src/app/services/store.service';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
    private modalController: ModalController,
    private router: Router,
    private productService: StoreService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.items = this.StoreService.getAllProducts();
    this.getProductRender();
    this.getUserData();
  }

  navigateToProductDetail(item: any) {
    this.router.navigate(['product-detail/', item.attributes.ProductName, item.attributes.ProductId]);
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

  isConditionTrue: boolean = false;

  getUserData() {
    this.userService.getUserData().subscribe(
      (res) => {
        this.user = res?.user;
        console.log('find user: ', this.user);
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


  isAddingMode: boolean = true;
  addProduct(event: Event, item: any) {
    if (this.user !== undefined && this.user !== null) {
      event.stopPropagation();
      const productData = {
        ProductName: item.attributes.ProductName,
        ProductPrice: item.attributes.ProductPrice,
        QuantityDefault: 1,
        ProductImage: item.attributes.ProductImage,
        ProductId: item.attributes.ProductId,
      };
      this.CartService.pushProducts(productData).subscribe(
        (response) => {
          console.log('Product added to cart successfully:', response);
          const strapiId = response.data.id;
          console.log('Strapi ID:', strapiId);
          this.saveStrapiId(strapiId);
          //window.location.reload();
        },
        
        (error) => {
          console.error('Error adding product to cart:', error);
        }
      );
    } 
    else {
      event.stopPropagation();
    }
  }

  // save id từ return res 
  saveStrapiId(strapiId: string): void {
    this.strapiId = strapiId;
  }
  getStrapiId(): string {
    return this.strapiId;
  }

  cancelProduct(event: Event, item: any) {
    if(this.user !== undefined && this.user !== null) {
      event.stopPropagation();
      const strapiId = this.getStrapiId();
      if (strapiId) {
        event.stopPropagation();
        this.CartService.deleteProduct(strapiId).subscribe(
          (response) => {
            console.log('Product deleted from cart successfully:', response);
          },
          (error) => {
            console.error('Error deleting product from cart:', error);
          }
        );
      } else {
        console.error('Strapi ID is not available. Unable to delete product.');
      }
    } 
    else {
      event.stopPropagation();
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
