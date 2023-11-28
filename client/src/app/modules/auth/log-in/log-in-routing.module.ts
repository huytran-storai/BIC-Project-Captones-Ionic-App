import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInPage } from './log-in.page';
import { UserRegisterService } from 'src/app/services/user-register.service';

const routes: Routes = [
  {
    path: '',
    component: LogInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [UserRegisterService],
  exports: [RouterModule],
})
export class LogInPageRoutingModule {}
