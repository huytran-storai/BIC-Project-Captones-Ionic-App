import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { PurchasehistoryService } from 'src/app/services/purchasehistory.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
})
export class PurchaseHistoryPage implements OnInit {
  public infoHistory: any
  constructor(
    private router: Router,
    private PurchasehistoryService: PurchasehistoryService,
    private navCrtl: NavController,
    private StoreService: StoreService,
    private CartService: CartService
  ) { }

  ngOnInit(): void {
    this.rednerInfoHistory();
    this.CartService.getCartItemsObservable().subscribe(
      (response) => {
        this.rednerInfoHistory();
      },
      (error) => {
        console.error('Error getting cart items:', error);
      }
    );
  }
  
  rednerInfoHistory() {
    this.StoreService.getHistoryList().subscribe(
      (res: any) => {
        this.infoHistory = res.data.map((item: any) => item);
        console.log('infoHistory:', this.infoHistory);
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  navigateDetailHistory(item: any) {
    this.router.navigate(['detail-history/', item.id]);
  }

  Back(){
    this.navCrtl.back()
  }

  
}
