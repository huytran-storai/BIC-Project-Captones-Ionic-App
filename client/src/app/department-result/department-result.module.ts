import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentResultPageRoutingModule } from './department-result-routing.module';

import { DepartmentResultPage } from './department-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentResultPageRoutingModule
  ],
  declarations: [DepartmentResultPage]
})
export class DepartmentResultPageModule {}
