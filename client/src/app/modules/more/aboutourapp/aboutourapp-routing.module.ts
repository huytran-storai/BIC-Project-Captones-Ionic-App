import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutourappPage } from './aboutourapp.page';

const routes: Routes = [
  {
    path: '',
    component: AboutourappPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutourappPageRoutingModule { }
