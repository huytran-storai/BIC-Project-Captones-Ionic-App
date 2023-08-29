import { IonicModule} from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabmenuComponent } from './partials/tabmenu/tabmenu.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [TabmenuComponent,ProductListComponent,ProductDetailsComponent],
  imports: [CommonModule, IonicModule,RouterModule],
  exports:[TabmenuComponent, ProductListComponent,ProductDetailsComponent],
})
export class ShareModule {}