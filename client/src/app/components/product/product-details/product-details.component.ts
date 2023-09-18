import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  addProduct(store: any) {
    store.added = true;
  }

  @Input() product: any;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() { }

  async closeModalAndNavigateToCart() {
    await this.modalController.dismiss();
    this.router.navigate(['/shopping-cart']);
  }
}
