import { IonicModule} from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabmenuComponent } from './partials/tabmenu/tabmenu.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import {RouterModule} from '@angular/router';
import { CheckoutIconComponent } from './checkout-icon/checkout-icon.component';
@NgModule({
  declarations: [TabmenuComponent,ProductListComponent,ProductDetailsComponent, CheckoutIconComponent],
  imports: [CommonModule, IonicModule,RouterModule],
  exports:[TabmenuComponent, ProductListComponent,ProductDetailsComponent, CheckoutIconComponent],
})
export class ShareModule {}