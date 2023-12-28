import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInPage } from './log-in.page';
import { UserService } from 'src/app/services/user.service';

const routes: Routes = [
  {
    path: '',
    component: LogInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [UserService],
  exports: [RouterModule],
})
export class LogInPageRoutingModule {}
