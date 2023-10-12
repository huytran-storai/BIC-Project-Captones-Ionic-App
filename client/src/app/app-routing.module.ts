import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'department',
    loadChildren: () => import('./department/department.module').then(m => m.DepartmentPageModule)
  },
  {
    path: 'search-product',
    loadChildren: () => import('./search-product/search-product.module').then(m => m.SearchProductPageModule)
  },
  {
    path: 'department/department-result/:tagName',
    loadChildren: () => import('./department-result/department-result.module').then(m => m.DepartmentResultPageModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./profile/account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'edit-account',
    loadChildren: () => import('./profile/account/edit-account/edit-account.module').then(m => m.EditAccountPageModule)
  },
  {
    path: 'edit-contact',
    loadChildren: () => import('./profile/account/edit-contact/edit-contact.module').then(m => m.EditContactPageModule)
  },
  {
    path: 'edit-address-book',
    loadChildren: () => import('./profile/account/edit-address-book/edit-address-book.module').then(m => m.EditAddressBookPageModule)
  },
  {
    path: 'edit-payment-cards',
    loadChildren: () => import('./profile/account/edit-payment-cards/edit-payment-cards.module').then(m => m.EditPaymentCardsPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./profile/account/add-address/add-address.module').then(m => m.AddAddressPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
