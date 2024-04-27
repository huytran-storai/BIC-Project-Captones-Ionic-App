import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LogInPage } from './log-in.page';

const routes: Routes = [
  {
    path: '',
    component: LogInPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class LogInPageRoutingModule {}
