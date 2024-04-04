import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
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
    private loadingController:LoadingController
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
    this.getUserData();
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

  async getUserData() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.UserService.getUserData().subscribe(
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

  async getProductRender() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.PurchasehistoryService.getHistoryList().subscribe(
      (res: any) => {
        loading.dismiss();
        this.historyDetail = res.data.map((item: any) => item);
        this.historyInfo = this.historyDetail.filter((product: any) => {
       
          this.purchaseId = parseInt(this.purchaseId, 10);
          this.OrderedProducts = product.attributes.OrderedProducts
          return product.id === this.purchaseId;
          
        });
        this.jsonString = this.OrderedProducts;
        console.log('this.jsonString:', this.jsonString);
       
        if (this.historyInfo) {
          console.log('Product Information:', this.historyInfo);
        
        } else {
          console.error('Product not found!');
        }
      },
      (err: any) => {
        loading.dismiss();
        console.error('Error fetching current store ', err);
      }
    );
  }

  Back(){
    this.navCtrl.back()
  }

  async butAgain(order: any) {
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
      const loading = await this.loadingController.create({ 
        cssClass: 'loading',
      })
      await loading.present();
      const productsObject = productsAddAgain.forEach((item: any) => {
        this.CartService.pushProducts(item).subscribe(
          (response) => {
            loading.dismiss();
            const strapiId = response.data.id;
            console.log('respone:', response);
            this.modalController.dismiss();
            this.router.navigate(['./shopping-cart']);
          },
          (error) => {
            loading.dismiss();
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
}
