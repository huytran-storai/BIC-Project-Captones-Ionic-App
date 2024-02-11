import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { PurchasehistoryService } from 'src/app/services/purchasehistory.service';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { PromosService } from 'src/app/services/promos.service';
// import { type } from 'os';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.page.html',
  styleUrls: ['./checkout-order.page.scss'],
})
export class CheckOutOrderPage implements OnInit {
  readonly phoneMask: MaskitoOptions = {
    mask: [
      '+',
      '8',
      '4',
      ' ',
      '(',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
    ],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();
  cartItems: any[] = [];
  pickupChecked: boolean = true;
  deliveryChecked: boolean = false;
  payOnline: boolean = false;
  payAfter: boolean = true;
  currentDate: string;
  modal!: IonModal;
  message = 'Nhập mã giảm giá';
  PromoCode: string = '';
  NoteCart: string = '';
  public _numberOfItems: number | undefined;
  // checkItemsCart: boolean = false;
  public currentStore: any;
  public user: any;
  public deliveryFee: number = 0 ;
  contactInfo: any = {};
  newFirstName: string = '';
  newLastName: string = '';
  newAddress: string = '';
  newPhone: string = '';
  selectedMethodReceives: string = 'Giao hàng theo địa chỉ của bạn';
  selectedMethodPayments: string = 'Thanh toán khi nhận hàng';
  public productData: any;
  public infoCheckOut: any;
  DateTimePick!: string;
  public info: any;
  emptyModal: boolean = true;
  tax = 65000;
  inputPromo: string = '';
  public promoData: any;
  public getPercentDiscount: number = 0;
  wrongCode: boolean = false;
  sentAlertWrong: string = '';
  public returnDate: string = '';
  public UserIdCurrent: any;
  public productRender: any;
  public productOrdered: any;


  ngOnInit() {
    // this.loadCartItems();
    this.getUserData();
    this.getCurrentStore();
    // this.getProductRender();
    this.rednerInfoCheckOut();
    this.getPromoRender();
    this.updateDeliveryFee();
    this.renderCartDetail();

    this.CartService.checkout$.subscribe(() => {
      this.renderCartDetail();
    });
  }

  constructor(
    private location: Location,
    private modalController: ModalController,
    private storeService: StoreService,
    private userService: UserService,
    private CartService: CartService,
    public alertController: AlertController,
    private router: Router,
    private CheckOutService: CheckoutService,
    private PromosService: PromosService
  ) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    this.currentDate = `${year}-${this.formatTime(month)}-${this.formatTime(
      day
    )}T${this.formatTime(hour)}:${this.formatTime(minute)}`;
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  updateContact() {
    this.contactInfo.firstName = this.newFirstName;
    this.contactInfo.lastName = this.newLastName;
    this.contactInfo.address = this.newAddress;
    this.contactInfo.phone = this.newPhone;
    this.modalController.dismiss();
  }

  ionViewWillEnter() {
    // this.CartDetails();
    // this.checkItemsCart;
    // this.calculateItem;
    // this.loadCartItems();
  }

  // loadCartItems() {
  //   this.cartItems = this.cartService.getCartItems();
  // }

  getCurrentStore() {
    this.storeService.getCurrentStoreAddress().subscribe(
      (res: any) => {
        this.currentStore = res.data.map((item: any) => item.attributes);
        console.log('find store', this.currentStore);
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  // private calculateItem(numberOfItems: number | undefined): boolean {
  //   if (numberOfItems === 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // get numberOfItems(): number | undefined {
  //   return this._numberOfItems;
  // }

  // set numberOfItems(value: number | undefined) {
  //   this._numberOfItems = value;
  //   // this.checkItemsCart = this.calculateItem(value);
  // }

  subTotalAmount: number | undefined;
  subTotal(): number {
    let subTotal = 0;
    for (const product of this.productOrdered) {
      subTotal += product.ProductPrice * product.productQuantityAddDefault;
    }
    return subTotal;
  }

  // CartDetails() {
  //   if (localStorage.getItem('localCart')) {
  //     this.cartItems = JSON.parse(localStorage.getItem('localCart') || '[]');
  //     this.numberOfItems = this.cartItems.length;
  //   }
  // }

  checkInput() {
    if (this.inputPromo !== '' && this.inputPromo !== undefined) {
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
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss(this.PromoCode, 'confirm');
  }

  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
  }

  btnPaid() {
    this.alertController
      .create({
        header: 'Thank you!',
        message:
          'Cảm ơn bạn đã sử dụng dịch vụ hệ thống của cửa hàng chúng tôi. Admin sẽ liên hệ xác nhận với bạn trong vòng 24h tới! BIC rất hân hạnh khi phục vụ đến bạn. Nếu bạn vần hỗ trợ vui lòng liện hệ hotline 19001918 để giúp đỡ !',
        buttons: [
          {
            text: 'HOÀN TẤT',
            handler: () => {
              localStorage.removeItem('localCart');
              // this.modalController.dismiss();
              window.location.reload();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  btnCancelCart() {
    this.alertController
      .create({
        header: 'Tạm biệt',
        message:
          'Cảm ơn bạn đã sử dụng dịch vụ hệ thống của cửa hàng chúng tôi. Đơn hàng đã huỷ thành công, bạn có thể dặt lại sản phẩm ở mục "Lịch sử mua hàng" trên hệ thống. Nếu bạn vần hỗ trợ vui lòng liện hệ hotline 19001918 để giúp đỡ !',
        buttons: [
          {
            text: 'HOÀN TẤT',
            handler: () => {
              localStorage.removeItem('localCart');
              // this.modalController.dismiss();
              this.router.navigate(['./home']);
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

  getUserData() {
    this.userService.getUserData().subscribe(
      (res) => {
        this.user = res?.user;
        console.log('User data in shopping cart:', this.user);
         this.UserIdCurrent = this.user.UserId
      },
      (error) => {
        console.log('Error get user data:', error);
      }
    );
  }

  // getProductRender() {
  //   this.CheckOutService.getProductsCart().subscribe(
  //     (res: any) => {
  //       this.productData = res.data.map((item: any) => item.attributes);
  //       console.log('productData', this.productData);
  //       var modifiedProductData = this.productData.map(function (item: {
  //         ProductName: any;
  //         productQuantityAddDefault: any;
  //       }) {
  //         return {
  //           ProductName: item.ProductName,
  //           productQuantityAddDefault: item.productQuantityAddDefault,
  //         };
  //       });
  //       console.log('modifiedProductData', modifiedProductData);
  //       var toString = JSON.stringify(modifiedProductData, null, 2);
  //       console.log('productData to string', toString);
  //     },
  //     (err: any) => {
  //       console.error('Error fetching current store data:', err);
  //     }
  //   );
  // }



  renderCartDetail() {
    this.CheckOutService.getProductsCart().subscribe(
      (res: any) => {
        this.productRender = res.data.map((item: any) => item.attributes);
        console.log("Product lists:", this.productRender)
        this.productOrdered = this.productRender.filter((item: any) => item.OrderedUserId === this.UserIdCurrent);
        console.log("Product lists:", this.productOrdered)
        console.log('UserIdCurrent in shopping cart:', this.UserIdCurrent);
        var modifiedProductData = this.productOrdered.map(function (item: {
          ProductName: any;
          productQuantityAddDefault: any;
        }) {
          return {
            ProductName: item.ProductName,
            productQuantityAddDefault: item.productQuantityAddDefault,
          };
        });
        console.log('modifiedProductData renderCartDetail', modifiedProductData);
        var toString = JSON.stringify(modifiedProductData, null, 2);
        console.log('productData to string renderCartDetail', toString);
      },
      (err: any) => {
        console.log('Error Cart list API:', err);
      }
    );
  }

  getPromoRender() {
    this.wrongCode = false;
    this.sentAlertWrong = '';
    this.PromosService.getPromocodes().subscribe(
      (res: any) => {
        this.promoData = res.data.map((item: any) => item.attributes);
        console.log('this.promoData:', this.promoData);
        const promoForeach = this.promoData;
        let found = false;
        promoForeach.forEach((PromoCode: any) => {
          console.log('Find promoData ForEach:', PromoCode);
          if (this.inputPromo === PromoCode.PromoCode) {
            found = true;
            this.getPercentDiscount = PromoCode.DiscountPromo;
            console.log('getDiscount', this.getPercentDiscount);
          }
        });
        if(this.inputPromo === ''){
          this.sentAlertWrong = " ";
        }
        else if (!found) {
          this.wrongCode = true;
          this.sentAlertWrong = "Mã ưu đãi không hợp lệ";
      }
        this.modalController.dismiss(this.inputPromo, 'confirm');
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  rednerInfoCheckOut() {
    this.CheckOutService.getInfoCheckOut().subscribe(
      (res: any) => {
        this.infoCheckOut = res.data.map((item: any) => item.attributes);
        console.log('rednerInfoCheckOut', this.infoCheckOut);
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  onDatetimeChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    const formattedDateString = selectedDate.toISOString();
    this.returnDate = formattedDateString;
  }

  fieldCheckout = [
    {
      payments: [
        {
          MethodPayment: 'Chuyển khoản trước',
        },
        {
          MethodPayment: 'Thanh toán khi nhận hàng',
        },
      ],
      receives: [
        {
          MethodReceives: 'Giao hàng theo địa chỉ của bạn',
        },
        {
          MethodReceives: 'Nhận tại của hàng chúng tôi',
        },
      ],
    },
  ];

  updateDeliveryFee() {
    if (this.selectedMethodReceives === 'Giao hàng theo địa chỉ của bạn') {
      this.deliveryFee = 30000; 
    } else if (this.selectedMethodReceives === 'Nhận tại của hàng chúng tôi') {
      this.deliveryFee = 0; 
    }
  }

  checkOutBtn(
    selectedMethodPayments: string,
    selectedMethodReceives: string,
    newFirstName: string,
    newLastName: string,
    newAddress: string,
    newPhone: string,
    NoteCart: string,
  ) {
    if (
      newFirstName === '' ||
      newLastName === '' ||
      newAddress === '' ||
      newPhone === '' ||
      this.returnDate === ''
    ) {
      this.alertController
        .create({
          header: 'Thông báo',
          message:
            'Xin vui lòng nhập đủ Thông tin liên lạc và Thời gian nhận hàng để tiếp tục đặt hàng.',
          buttons: [
            {
              text: 'ĐỒNG Ý',
              handler: () => {
                setTimeout(() => {
                  this.modalController.dismiss().then(() => {
                    this.emptyModal = false;
                  });
                }, 0);
              },
            },
          ],
        })
        .then((alert) => {
          alert.present();
        });
      this.emptyModal = false;
    } else {
      this.emptyModal = true;
      var modifiedProductData = this.productOrdered.map(function (item: {
        ProductName: any;
        productQuantityAddDefault: any;
      }) {
        return {
          ProductName: item.ProductName,
          productQuantityAddDefault: item.productQuantityAddDefault,
        };
      });
      var Products = JSON.stringify(modifiedProductData, null, 1);
      const subTotal = this.subTotal();
      const numberOfItems = this.productOrdered.length
      const checkOutData = {
        NoteOrder: NoteCart,
        MethodPayment: selectedMethodPayments,
        AddressType: selectedMethodReceives,
        TaxOrder: this.tax,
        FirstName: newFirstName,
        LastName: newLastName,
        AddressCustomer: newAddress,
        PhoneCustomer: newPhone,
        DeliveryDate: this.DateTimePick,
        TotalPrice: (subTotal + this.tax + this.deliveryFee) - (subTotal + this.tax + this.deliveryFee) * (this.getPercentDiscount / 100),
        TotalItem: numberOfItems,
        PromoApplied: this.inputPromo,
        OrderedProducts: Products.replace(/[\[\]{}]/g, ''),
      };

      this.storeService.getInfoCheckOut(checkOutData).subscribe(
        (res: any) => {
          console.log('Res successful post information to orders:', res);
          this.info = res.data.attributes;
        },
        (err: any) => {
          console.error('Error post information to orders:', err);
        }
      );
    }
  }
}
