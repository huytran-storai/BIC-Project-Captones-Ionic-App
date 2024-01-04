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

  constructor(
    private router: Router,
    private historyService: PurchasehistoryService,
    private navCrtl: NavController,
  ) { }

  ngOnInit() {
    this.items = this.historyService.getHistory()
  }
  

  navigateDetailHistory(item: any) {
    this.router.navigate(['/detail-history', item.id]);
  }

  Back(){
    this.navCrtl.back()
  }
}
