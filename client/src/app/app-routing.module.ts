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
    path: 'login',
    loadChildren: () => import('./modules/auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./modules/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path:'account',
    loadChildren:() => import('./modules/more/account/account.module').then( m => m.AccountPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
