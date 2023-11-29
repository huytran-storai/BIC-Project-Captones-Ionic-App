import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePage } from './more.page';

const routes: Routes = [
  {
    path: '',
    component: MorePage
  },  {
    path: 'chatboxbic',
    loadChildren: () => import('./chatboxbic/chatboxbic.module').then( m => m.ChatboxbicPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePageRoutingModule {}
