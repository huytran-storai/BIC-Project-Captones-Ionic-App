import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchProductPageRoutingModule } from './search-product-routing.module';

import { SearchProductPage } from './search-product.page';
import { ShareModule } from '../../../components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchProductPageRoutingModule,
    ShareModule
  ],
  declarations: [SearchProductPage]
})
export class SearchProductPageModule {}
