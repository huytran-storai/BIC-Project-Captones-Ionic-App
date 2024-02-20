import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PurchasehistoryService } from 'src/app/services/purchasehistory.service';
import { Histories } from 'src/app/shared/models/Histories';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
})
export class PurchaseHistoryPage implements OnInit {
  items: Histories[] = [];
  public infoHistory: any

  constructor(
    private router: Router,
    private PurchasehistoryService: PurchasehistoryService,
    private navCrtl: NavController,
  ) { }

  ngOnInit() {
    this.items = this.PurchasehistoryService.getHistory()
    this.rednerInfoHistory();
  }
  
  rednerInfoHistory() {
    this.PurchasehistoryService.getHistoryList().subscribe(
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
