import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'product-all',
    loadChildren: () => import('./modules/product/product-all/product-all.module').then( m => m.ProductAllPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./modules/product/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'more',
    loadChildren: () => import('./modules/more/more.module').then(m => m.MorePageModule)
  },
  {
    path: 'department',
    loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentPageModule)
  },
  {
    path: 'search-product',
    loadChildren: () => import('./modules/product/search-product/search-product.module').then(m => m.SearchProductPageModule)
  },
  {
    path: 'department/department-result/:tagName',
    loadChildren: () => import('./modules/department/department-result/department-result.module').then(m => m.DepartmentResultPageModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./modules/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartPageModule)
  },
  {
    path: 'checkout-order',
    loadChildren: () => import('./modules/shopping-cart/checkout-order/checkout-order.module').then(m => m.CheckOutOrderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./modules/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/more/account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'blog-detail',
    loadChildren: () => import('./modules/home/blog-detail/blog-detail.module').then(m => m.BlogDetailPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./modules/more/account/add-address/add-address.module').then(m => m.AddAddressPageModule)
  },
  {
    path: 'edit-account',
    loadChildren: () => import('./modules/more/account/edit-account/edit-account.module').then(m => m.EditAccountPageModule)
  },
  {
    path: 'edit-address-book',
    loadChildren: () => import('./modules/more/account/edit-address-book/edit-address-book.module').then(m => m.EditAddressBookPageModule)
  },
  {
    path: 'edit-contact',
    loadChildren: () => import('./modules/more/account/edit-contact/edit-contact.module').then(m => m.EditContactPageModule)
  },
  {
    path: 'edit-payment-cards',
    loadChildren: () => import('./modules/more/account/edit-payment-cards/edit-payment-cards.module').then(m => m.EditPaymentCardsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
