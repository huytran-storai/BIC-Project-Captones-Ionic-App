import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaskitoDirective } from '@maskito/angular';
import { CheckOutOrderRoutingModule } from './checkout-order-routing.module';
import { CheckOutOrderPage } from './checkout-order.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoDirective,
    CheckOutOrderRoutingModule,
  ],
  declarations: [CheckOutOrderPage],
})
export class CheckOutOrderPageModule {}
