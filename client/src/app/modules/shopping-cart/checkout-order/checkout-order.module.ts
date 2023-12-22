import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CheckOutOrderRoutingModule } from './checkout-order-routing.module';
import { CheckOutOrderPage } from './checkout-order.page';
import { MaskitoModule } from '@maskito/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoModule,
    CheckOutOrderRoutingModule
  ],
  declarations: [CheckOutOrderPage]
})
export class CheckOutOrderPageModule {}
