import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },  {
    path: 'add-address',
    loadChildren: () => import('./add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'edit-account',
    loadChildren: () => import('./edit-account/edit-account.module').then( m => m.EditAccountPageModule)
  },
  {
    path: 'edit-address-book',
    loadChildren: () => import('./edit-address-book/edit-address-book.module').then( m => m.EditAddressBookPageModule)
  },
  {
    path: 'edit-contact',
    loadChildren: () => import('./edit-contact/edit-contact.module').then( m => m.EditContactPageModule)
  },
  {
    path: 'edit-payment-cards',
    loadChildren: () => import('./edit-payment-cards/edit-payment-cards.module').then( m => m.EditPaymentCardsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
