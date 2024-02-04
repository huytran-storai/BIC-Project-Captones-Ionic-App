import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { modalController } from '@ionic/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { AlertController, ModalController } from '@ionic/angular';
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
  departments: string[] = [`Wine`, `Beer`, `Whiskey`, `Spririts & Liqueur`];
  departmentShow: string[] = [];
  selectedDepartment: any = {};
  showMoreDepartment = false;
  public user: any;
  public UserIdCurrent: any;

  brands: string[] = [
    `Chimay (1)`,
    `Corona`,
    `Dom Perignon`,
    `14 hands`,
    `Mad River `,
    `Bombay`,
    `Danzka`,
  ];
  brandShow: string[] = [];
  selectedBrand: any = {};
  showMoreBrand = false;

  lifestyles: string[] = [
    `Gluten free (1)`,
    `Vegan`,
    `Organic`,
    `Low-Alcohol`,
    `Non-alcoholic`,
    `Natural Wine `,
    `Biodynamic Wine`,
    `Fair Trade Wine`,
  ];
  lifestyleShow: string[] = [];
  selectedLifestyle: any = {};
  showMoreLifestyles = false;
  public productData: any;
  productResult: any[] = [];
  public renderStrapiId: any;

  constructor(
    private route: ActivatedRoute,
    private productService: StoreService,
    private router: Router,
    private userService: UserService,
    private CartService: CartService,
    private modalController: ModalController,
    public alertController: AlertController,
  ) {
    this.departments.forEach((department) => {
      this.selectedDepartment[department] = false;
    });
    this.departmentShow = this.departments.slice(0, 3);

    this.brands.forEach((brand) => {
      this.selectedBrand[brand] = false;
    });
    this.brandShow = this.brands.slice(0, 3);

    this.lifestyles.forEach((lifestyle) => {
      this.selectedLifestyle[lifestyle] = false;
    });
    this.lifestyleShow = this.lifestyles.slice(0, 3);
  }

  ngOnInit() {
    this.renderProductResult();
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

  renderProductResult() {
    this.productService.getProducts().subscribe(
      (res: any) => {
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
      (err: any) => {}
    );
  }

  toggleShowMoreDepartment() {
    this.showMoreDepartment = !this.showMoreDepartment;
    if (this.showMoreDepartment) {
      this.departmentShow = this.departments;
    } else {
      this.departmentShow = this.departments.slice(0, 3);
    }
  }

  toggleShowMoreBrand() {
    this.showMoreBrand = !this.showMoreBrand;
    if (this.showMoreBrand) {
      this.brandShow = this.brands;
    } else {
      this.brandShow = this.brands.slice(0, 3);
    }
  }

  toggleShowMoreLifestyle() {
    this.showMoreLifestyles = !this.showMoreLifestyles;
    if (this.showMoreLifestyles) {
      this.lifestyleShow = this.lifestyles;
    } else {
      this.lifestyleShow = this.lifestyles.slice(0, 3);
    }
  }

  toggleReset() {
    this.selectedBrand = {};
    this.selectedDepartment = {};
    this.selectedLifestyle = {};
  }

  toggleApply() {
    this.router.navigate(['/filter-result']);
    modalController.dismiss();
  }

  areAnyCheckboxesSelected(): boolean {
    const brandValues = Object.values(this.selectedBrand);
    const lifestyleValues = Object.values(this.selectedLifestyle);
    const departmentValues = Object.values(this.selectedDepartment);
    return brandValues
      .concat(lifestyleValues, departmentValues)
      .some((value) => value === true);
  }

  navigateToProductDetail(item: any) {
    this.router.navigate(['product-detail/', item.attributes.ProductName,item.attributes.ProductId]);
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
    let cartData = JSON.parse(localStorage.getItem('saveCartItems') || '[]')
    return cartData.some((product: any) => product.saveProductId === item)
}
}
