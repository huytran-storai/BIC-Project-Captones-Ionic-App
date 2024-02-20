import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { PurchasehistoryService } from 'src/app/services/purchasehistory.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-history',
  templateUrl: './detail-history.page.html',
  styleUrls: ['./detail-history.page.scss'],
})
export class DetailHistoryPage implements OnInit {
  detaillHistory: any;
  detailInfor: any;
  public currentStore: any;
  itemCart: any = []
  public purchaseId: any;
  public historyDetail: any
  public historyInfo: any
  public jsonData: any
  public jsonString: any
  public OrderedProducts: any;
  public getProduct: any
  public user: any
  public UserIdCurrent: any
  constructor(
    private route: ActivatedRoute,
    private PurchasehistoryService: PurchasehistoryService,
    private navCtrl: NavController,
    private storeService: StoreService,
    private CartService: CartService,
    private UserService: UserService,
    public alertController: AlertController,
    private modalController: ModalController,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getCurrentStore();
    this.route.params.subscribe((params) => {
      this.purchaseId = params['id']; 
      console.log('===>', this.purchaseId);
      this.getProductRender();
    });
    this.jsonString = `
      ${this.getProduct}
    `;
console.log(this.getProduct)
    this.jsonData = this.PurchasehistoryService.parseJsonFromString(this.jsonString);
    this.getUserData();
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

  loadDetailHistory(id: any){
    this.detaillHistory =  this.PurchasehistoryService.getHistoryById(id)
  }

  getUserData() {
    this.UserService.getUserData().subscribe(
      (res) => {
        this.user = res?.user;
        console.log('find user: ', this.user);
        this.UserIdCurrent = this.user.id;
        console.log('find UserIdCurrent: ', this.UserIdCurrent);
      },
      (error) => {
        console.log('Get user data error', error);
      }
    );
  }

  getProductRender() {
    this.PurchasehistoryService.getHistoryList().subscribe(
      (res: any) => {
        this.historyDetail = res.data.map((item: any) => item);
        this.historyInfo = this.historyDetail.filter((product: any) => {
       
          this.purchaseId = parseInt(this.purchaseId, 10);
          console.log('Purchase detail:', product.attributes.OrderedProducts);
          this.OrderedProducts = product.attributes.OrderedProducts
          console.log('OrderedProducts:', this.OrderedProducts);
          return product.id === this.purchaseId;
          
        });
        this.jsonString = this.OrderedProducts;
        console.log('this.jsonString:', this.jsonString);
        // Chuyển đổi jsonString thành đối tượng JSON
        this.jsonData = this.PurchasehistoryService.parseJsonFromString(this.jsonString);
        console.log('this.jsonData:', this.jsonData);
       
        if (this.historyInfo) {
          console.log('Product Information:', this.historyInfo);
        
        } else {
          console.error('Product not found!');
        }
      },
      (err: any) => {
        console.error('Error fetching current store ', err);
      }
    );
  }

  Back(){
    this.navCtrl.back()
  }

  butAgain(order: any) {
    if(this.UserIdCurrent !== undefined && this.UserIdCurrent !== null){
      const products = order[0]
      const productsAddAgain = products.attributes.OrderedProducts.map((item: any) => {
        return {
          ProductName: item.ProductName,
          ProductPrice: item.TotalPrice / item.productQuantityAddDefault,
          ProductId: item.ProductId,
          OrderedUserId: this.UserIdCurrent,
          ProductImage: item.ProductImage
        }
      })
      console.log("productsAddAgain",productsAddAgain)
      const productsObject = productsAddAgain.forEach((item: any) => {
        this.CartService.pushProducts(item).subscribe(
          (response) => {
            const strapiId = response.data.id;
            console.log('respone:', response);
            this.modalController.dismiss();
            this.router.navigate(['./shopping-cart']);
          },
          (error) => {
            console.error('Error adding product to cart:', error);
          }
        );
      });
    } else {
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
  
  // addProduct(event: Event, item: any) {
  //   if (this.user !== undefined && this.user !== null) {
  //   event.stopPropagation();
  //   const productData = {
  //     ProductName: item.attributes.ProductName,
  //     ProductPrice: item.attributes.ProductPrice,
  //     QuantityDefault: 1,
  //     ProductImage: item.attributes.ProductImage,
  //     ProductId: item.attributes.ProductId,
  //     OrderedUserId: this.UserIdCurrent,
  //   };
  //   this.CartService.pushProducts(productData).subscribe(
  //     (response) => {
  //       const strapiId = response.data.id;
  //       const saveProductId = response.data.attributes.ProductId;
  //       const savedCartItemsString = localStorage.getItem(`${this.UserIdCurrent}`);
  //       const existingCartItems = savedCartItemsString? JSON.parse(savedCartItemsString): [];
  //       existingCartItems.push({ ...item, strapiId, saveProductId });
  //       localStorage.setItem(`${this.UserIdCurrent}`,JSON.stringify(existingCartItems));
  //       this.renderStrapiId = existingCartItems;
  //     },
  //     (error) => {
  //       console.error('Error adding product to cart:', error);
  //     }
  //   );
  //   }
  //   else {
  //     event.stopPropagation();
  //     this.alertController
  //       .create({
  //         header: 'Thông báo',
  //         message: 'Vui lòng đăng nhập để thêm sản phẩm',
  //         buttons: [
  //           {
  //             text: 'Đăng nhập',
  //             handler: () => {
  //               this.modalController.dismiss();
  //               this.router.navigate(['./login']);
  //               setTimeout(() => {
  //                 window.location.reload();
  //               }, 0);
  //             },
  //           },
  //         ],
  //       })
  //       .then((alert) => {
  //         alert.present();
  //       });
  //   }
  // }

}
