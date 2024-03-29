import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePage } from './more.page';

const routes: Routes = [
  {
    path: '',
    component: MorePage
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePageRoutingModule { }
