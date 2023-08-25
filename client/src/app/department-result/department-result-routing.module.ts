import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentResultPage } from './department-result.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentResultPageRoutingModule {}
