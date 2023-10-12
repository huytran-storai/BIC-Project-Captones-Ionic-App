import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabmenuComponent } from './partials/tabmenu/tabmenu.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { CheckoutIconComponent } from './checkout-icon/checkout-icon.component';
import { NewsComponent } from './news/news.component';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TabmenuComponent, ProductListComponent, ProductDetailsComponent, CheckoutIconComponent, NewsComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [TabmenuComponent, ProductListComponent, ProductDetailsComponent, CheckoutIconComponent, NewsComponent],
})
export class ShareModule { }