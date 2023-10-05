import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOutOrderPage } from './checkout-order.page';

const routes: Routes = [
  {
    path: '',
    component: CheckOutOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckOutOrderRoutingModule {}
