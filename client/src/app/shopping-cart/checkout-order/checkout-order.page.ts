import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.page.html',
  styleUrls: ['./checkout-order.page.scss'],
})
export class CheckOutOrderPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
  }
}
