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
  public currentStore: any;
  public user: any;
  public deliveryFee: number = 0;
  contactInfo: any = {};
  newFirstName: string = '';
  newLastName: string = '';
  newAddress: string = '';
  newPhone: string = '';
  selectedMethodReceives: string = 'Giao hàng theo địa chỉ của bạn';
  selectedMethodPayments: string = 'Thanh toán khi nhận hàng';
  public productData: any;
  DateTimePick!: string;
  public info: any;
  isModalOpen: boolean = false;
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
  public deleteProductInCK: any;

  ngOnInit() {
    // this.loadCartItems();
    this.getUserData();
    this.getCurrentStore();
    // this.getProductRender();
    // this.rednerInfoCheckOut();
    this.getPromoRender();
    this.updateDeliveryFee();
    this.renderCartDetail();
    // this.infoCheckOut();
    this.CartService.getCartItemsObservable().subscribe(
      (response) => {
        this.renderCartDetail();
      },
      (error) => {
        console.error('Error getting cart items:', error);
      }
    );
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

  closeModal() {
    this.modalController.dismiss();
  }

  openModal() {
    this.isModalOpen = true;
  }

  updateContact() {
    this.contactInfo.firstname = this.newFirstName;
    this.contactInfo.lastname = this.newLastName;
    this.contactInfo.address = this.newAddress;
    this.contactInfo.phone = this.newPhone;
    this.modalController.dismiss();
  }

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

  subTotalAmount: number | undefined;
  subTotal(): number {
    let subTotal = 0;
    if (!Array.isArray(this.productOrdered)) {
      return 0;
    }
    for (const product of this.productOrdered) {
      subTotal +=
        product.attributes.ProductPrice *
        product.attributes.productQuantityAddDefault;
    }
    return subTotal;
  }

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

  delAllProductAPI() {
    const delProduct = this.productOrdered;
    const idProduct = delProduct.map((item: { id: any }) => item.id);
    idProduct.forEach((id: any) => {
      this.CartService.deleteAll(id).subscribe(
        (response) => {
          console.log('Product deleted from cart successfully:', response);
          this.modalController.dismiss();
        },
        (error) => {
          console.error('Error deleting product from cart:', error);
        }
      );
    });
    localStorage.removeItem(`${this.user.id}`);
  }

  btnCancelCart() {
    this.delAllProductAPI();
    localStorage.removeItem('localCart');
    this.alertController
      .create({
        header: 'Tạm biệt',
        message:
          'Cảm ơn bạn đã sử dụng dịch vụ hệ thống của cửa hàng chúng tôi. Đơn hàng đã huỷ thành công, bạn có thể đặt lại sản phẩm ở mục "Lịch sử mua hàng" trên hệ thống. Nếu bạn vần hỗ trợ vui lòng liện hệ hotline 19001918 để giúp đỡ !',
        buttons: [
          {
            text: 'HOÀN TẤT',
            handler: () => {
              this.router.navigate(['./home']);
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
        if (this.user) {
          this.UserIdCurrent = this.user.id;
          console.log('user', this.user);
        } else {
          console.log('none');
        }
      },
      (error) => {
        console.log('Error get user data:', error);
      }
    );
  }

  renderCartDetail() {
    this.CartService.getProductsCart().subscribe(
      (res: any) => {
        this.productRender = res.data.map((item: any) => item);
        console.log('Product lists:', this.productRender);
        this.productOrdered = this.productRender.filter(
          (item: any) => item.attributes.OrderedUserId === this.UserIdCurrent
        );
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
          }
        });
        if (this.inputPromo === '') {
          this.sentAlertWrong = ' ';
        } else if (!found) {
          this.wrongCode = true;
          this.sentAlertWrong = 'Mã ưu đãi không hợp lệ';
        }
        if(this.inputPromo !== '' && found){
        this.modalController.dismiss(this.inputPromo, 'confirm');
        }
      },
      (err) => {
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

  onCheckoutOrDismiss() {
    const newusername = this.contactInfo.username;
    const newAddress = this.contactInfo.address;
    const newPhone = this.contactInfo.phone;

    if (!newusername || !newAddress || !newPhone) {
      this.alertController
        .create({
          header: 'Thông báo',
          message:
            'Xin vui lòng nhập đủ Thông tin liên lạc để tiếp tục đặt hàng.',
          buttons: [
            {
              text: 'ĐỒNG Ý',
              handler: () => {
                setTimeout(() => {
                  this.modalController.dismiss();
                }, 0);
              },
            },
          ],
        })
        .then((alert) => {
          alert.present();
        });
    } else {
      this.submitOrder();
    }
  }

  submitOrder() {
    var modifiedProductData = this.productOrdered.map(
      (item: {
        attributes: {
          ProductName: any;
          productQuantityAddDefault: any;
          ProductId: any;
          TotalPrice: any;
          ProductPrice: any;
          ProductImage: any;
        };
      }) => {
        return {
          ProductName: item.attributes.ProductName,
          productQuantityAddDefault: item.attributes.productQuantityAddDefault,
          ProductId: item.attributes.ProductId,
          TotalPrice:
            item.attributes.ProductPrice *
            item.attributes.productQuantityAddDefault,
          ProductImage: item.attributes.ProductImage,
        };
      }
    );
    var Products = modifiedProductData;
    const subTotal = this.subTotal();
    const numberOfItems = this.productOrdered.length;
    const checkOutData = {
      NoteOrder: this.NoteCart,
      MethodPayment: this.selectedMethodPayments,
      AddressType: this.selectedMethodReceives,
      TaxOrder: this.tax,
      FirstName: this.contactInfo.firstName,
      LastName: this.contactInfo.lastName,
      AddressCustomer: this.contactInfo.address,
      PhoneCustomer: this.contactInfo.phone,
      DeliveryDate: this.DateTimePick,
      TotalPrice:
        subTotal +
        this.tax +
        this.deliveryFee -
        (subTotal + this.tax + this.deliveryFee) *
          (this.getPercentDiscount / 100),
      TotalItem: numberOfItems,
      PromoApplied: this.inputPromo,
      DeliveryFee: this.deliveryFee,
      OrderedProducts: Products,
    };
    this.alertController
      .create({
        header: 'Thank you!',
        message:
          'Cảm ơn bạn đã sử dụng dịch vụ hệ thống của cửa hàng chúng tôi. Admin sẽ liên hệ xác nhận với bạn trong vòng 24h tới! BIC rất hân hạnh khi phục vụ đến bạn. Nếu bạn vần hỗ trợ vui lòng liện hệ hotline 19001918 để giúp đỡ !',
        buttons: [
          {
            text: 'HOÀN TẤT',
            handler: () => {
              this.storeService.getInfoCheckOut(checkOutData).subscribe(
                (res: any) => {
                  console.log(
                    'Res successful post information to orders:',
                    res
                  );
                  this.info = res.data.attributes;
                },
                (err: any) => {
                  console.error('Error post information to orders:', err);
                }
              );
              this.contactInfo.firstName = '';
              this.contactInfo.lastName = '';
              this.contactInfo.phone = '';
              this.contactInfo.address = '';
              this.router.navigate(['./home']);
              this.modalController.dismiss();
              const delProduct = this.productOrdered;
              const idProduct = delProduct.map((item: { id: any }) => item.id);
              idProduct.forEach((id: any) => {
                this.CartService.deleteAll(id).subscribe(
                  (response) => {
                    console.log(
                      'Product deleted from cart successfully:',
                      response
                    );
                  },
                  (error) => {
                    console.error('Error deleting product from cart:', error);
                  }
                );
              });
              localStorage.removeItem(`${this.user.id}`);
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
