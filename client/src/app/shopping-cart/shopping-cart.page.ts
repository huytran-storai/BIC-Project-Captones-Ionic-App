import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  refreshPage() {
    this.location.replaceState('/home');
    window.location.reload();
  }

}
