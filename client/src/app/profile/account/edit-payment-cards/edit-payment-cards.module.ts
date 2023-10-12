import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPaymentCardsPageRoutingModule } from './edit-payment-cards-routing.module';

import { EditPaymentCardsPage } from './edit-payment-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPaymentCardsPageRoutingModule
  ],
  declarations: [EditPaymentCardsPage]
})
export class EditPaymentCardsPageModule {}
