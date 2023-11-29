import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatboxbicPage } from './chatboxbic.page';

const routes: Routes = [
  {
    path: '',
    component: ChatboxbicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatboxbicPageRoutingModule {}
