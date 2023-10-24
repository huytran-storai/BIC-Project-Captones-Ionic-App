import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPaymentCardsPage } from './edit-payment-cards.page';

const routes: Routes = [
  {
    path: '',
    component: EditPaymentCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPaymentCardsPageRoutingModule {}
