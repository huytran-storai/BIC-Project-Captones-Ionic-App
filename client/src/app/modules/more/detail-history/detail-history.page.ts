import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PurchasehistoryService } from 'src/app/services/purchasehistory.service';
import { StoreService } from 'src/app/services/store.service';

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

  constructor(
    private route: ActivatedRoute,
    private historyService: PurchasehistoryService,
    private navCtrl: NavController,
    private storeService: StoreService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.detailInfor = params.get('id');
      this.loadDetailHistory(this.detailInfor);
    });
  }

  getCurrentStore() {
    this.storeService.getCurrentStoreAddress().subscribe(
      (res: any) => {
        this.currentStore = res?.data[0]?.attributes;
        console.log("find store", this.currentStore)
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  loadDetailHistory(id: any){
    this.detaillHistory =  this.historyService.getHistoryById(id)
  }

  Back(){
    this.navCtrl.back()
  }
  butAgain(order: any) {
    // Lấy danh sách sản phẩm từ đơn hàng trong lịch sử mua hàng
    const products = order.products;
  
    // Kiểm tra nếu giỏ hàng không tồn tại, tạo mới một giỏ hàng
    let cartData = localStorage.getItem('localCart');
    let cartItems = cartData ? JSON.parse(cartData) : [];
  
    // Thêm các sản phẩm từ lịch sử mua hàng vào giỏ hàng
    if (products && products.length > 0) {
      for (let product of products) {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        let existingProduct = cartItems.find((item: any) => item.id === product.id);
  
        if (existingProduct) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng sản phẩm trong giỏ hàng
          existingProduct.quantity += product.quantity;
        } else {
          // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng
          cartItems.push(product);
        }
      }
    }
  
    // Lưu giỏ hàng mới vào local storage
    localStorage.setItem('localCart', JSON.stringify(cartItems));
  }
  
}
