import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.page.html',
  styleUrls: ['./checkout-order.page.scss'],
})
export class CheckOutOrderPage implements OnInit {
  pickupChecked: boolean = false;
  deliveryChecked: boolean = false;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onCheckboxChange(type: 'pickup' | 'delivery') {
    if (type === 'pickup') {
      this.deliveryChecked = false;
    } else if (type === 'delivery') {
      this.pickupChecked = false;
    }
  }

  
  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
  }
}
