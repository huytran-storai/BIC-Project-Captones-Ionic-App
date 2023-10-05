import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isDropdownOpenNutrition = false;

  toggleDropdownNutrition() {
    this.isDropdownOpenNutrition = !this.isDropdownOpenNutrition;
  }

  isDropdownOpenProductInfor = false;

  toggleDropdownProductInfor() {
    this.isDropdownOpenProductInfor = !this.isDropdownOpenProductInfor;
  }

  isDropdownOpenDisclaimer = false;

  toggleDropdownDisclaimer() {
    this.isDropdownOpenDisclaimer = !this.isDropdownOpenDisclaimer;
  }

  addProduct(store: any) {
    store.added = !store.added;
  }

  addSugar(product: any) {
    product.addedSugar = !product.addedSugar;
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