import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentResultPageRoutingModule } from './department-result-routing.module';

import { DepartmentResultPage } from './department-result.page';
import { ShareModule } from '../../../components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentResultPageRoutingModule,
    ShareModule
  ],
  declarations: [DepartmentResultPage]
})
export class DepartmentResultPageModule {}
