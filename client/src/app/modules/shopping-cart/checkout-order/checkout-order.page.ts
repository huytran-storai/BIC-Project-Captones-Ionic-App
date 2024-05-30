import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController, IonModal, LoadingController, ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { PurchasehistoryService } from 'src/app/services/purchasehistory.service';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { PromosService } from 'src/app/services/promos.service';


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
  newName: string = '';
  newAddress: string = '';
  newPhone: string = '';
  selectedMethodReceives: string = 'Giao hàng theo địa chỉ của bạn';
  selectedMethodPayments: string = 'Thanh toán khi nhận hàng';
  public productData: any;
  DateTimePick!: string;
  public info: any;
  isModalOpen: boolean = false;
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
  public inforPayment:any;

  ngOnInit() {
    this.getUserData();
    this.getCurrentStore();
    this.getPromoRender();
    this.updateDeliveryFee();
    this.renderCartDetail();
    this.getInforPayment();
    this.CartService.getCartItemsObservable().subscribe(
      (response) => {
        this.renderCartDetail();
      },
      (error) => {
        console.error('Error getting cart items:', error);
      }
    );
    this.checkPaymentMethod();
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
    private PromosService: PromosService,
    private loadingController: LoadingController,
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

  async getCurrentStore() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.storeService.getCurrentStoreAddress().subscribe(
      (res: any) => {
        loading.dismiss();
        this.currentStore = res.data.map((item: any) => item.attributes);
        console.log('find store', this.currentStore);
      },
      (err) => {
        loading.dismiss();
        console.error('Error fetching current store data:', err);
      }
    );
  }

  subTotalAmount: number | undefined;
  tax: any;
  subTotal(): number {
    let subTotal = 0;
    if (!Array.isArray(this.productOrdered)) {
      return 0;
    }
    for (const product of this.productOrdered) {
      subTotal += product.attributes.ProductPrice * product.attributes.productQuantityAddDefault;
    }
    this.tax = subTotal / 10
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

  async delAllProductAPI() {
    const delProduct = this.productOrdered;
    const idProduct = delProduct.map((item: { id: any }) => item.id);
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    idProduct.forEach((id: any) => {
      this.CartService.deleteAll(id).subscribe(
        (response) => {
          loading.dismiss();
          console.log('Product deleted from cart successfully:', response);
          this.modalController.dismiss();
        },
        (error) => {
          loading.dismiss();
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
          this.newName = this.user.name;
          this.newAddress = this.user.address;
          this.newPhone = this.user.phone;
        } else {
          console.log('none');
        }
      },
      (error) => {
        console.log('Error get user data:', error);
      }
    );
  }

  async updateContact() {
    const updateInforUser = {
      id: this.UserIdCurrent,
      name: this.newName,
      address: this.newAddress,
      phone: this.newPhone,
    };
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.userService.updateInforUser(this.UserIdCurrent, updateInforUser).subscribe(
      () => {
        this.user.name = this.newName;
        this.user.address = this.newAddress;
        this.user.phone = this.newPhone;
        this.modalController.dismiss();
        loading.dismiss();
        console.log('name:', this.user.name);
        console.log('phone:', this.user.phone);
        console.log('address:', this.user.address);
      },
      (error) => {
        loading.dismiss();
        console.log('Lỗi khi cập nhật thông tin người dùng:', error);
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
        if (this.inputPromo !== '' && found) {
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

  checkPaymentMethod(){
    if(this.selectedMethodPayments === 'Chuyển khoản trước'){
      return true;
    } else if (this.selectedMethodPayments === 'Thanh toán khi nhận hàng'){
      return false;
    }
    return false; 
    
  }

  updateDeliveryFee() {
    if (this.selectedMethodReceives === 'Giao hàng theo địa chỉ của bạn') {
      this.deliveryFee = 30000;
    } else if (this.selectedMethodReceives === 'Nhận tại của hàng chúng tôi') {
      this.deliveryFee = 0;
    }
  }

  onCheckoutOrDismiss() {
    if (!this.DateTimePick || this.user.name === "" || this.user.phone === "" || this.user.address === "") {
      this.alertController
        .create({
          header: 'Thông báo',
          message:
            'Xin vui lòng nhập Ngày nhận hàng để tiếp tục đặt hàng.',
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
          TotalPrice:item.attributes.ProductPrice * item.attributes.productQuantityAddDefault,
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
      name: this.user.name,
      // LastName: this.contactInfo.lastName,
      AddressCustomer: this.user.address,
      phone: this.user.phone,
      DeliveryDate: this.DateTimePick,
      TotalPrice: (subTotal + this.tax + this.deliveryFee) - (subTotal + this.tax + this.deliveryFee) *  this.getPercentDiscount / 100,
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
            handler: async () => {
              const loading = await this.loadingController.create({ 
                cssClass: 'loading',
              })
              await loading.present();
              this.storeService.getInfoCheckOut(checkOutData).subscribe(
                (res: any) => {
                  loading.dismiss();
                  console.log(
                    'Res successful post information to orders:',
                    res
                  );
                  this.info = res.data.attributes;
                },
                (err: any) => {
                  loading.dismiss();
                  console.error('Error post information to orders:', err);
                }
              );
              // this.contactInfo.name = '';
              // this.contactInfo.lastName = '';
              // this.contactInfo.phone = '';
              // this.contactInfo.address = '';
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

  async getInforPayment() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.CheckOutService.getInfoPayment().subscribe(
      (res: any) => {
        loading.dismiss();
        this.inforPayment = res.data.map((item: any) => item.attributes);
        console.log('find infor payment', this.inforPayment);
      },
      (err) => {
        loading.dismiss();
        console.error('Error fetching information payment data:', err);
      }
    );
  }
}
