import { IonicModule} from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabmenuComponent } from './partials/tabmenu/tabmenu.component';
import { ProductListComponent } from './product/product-list/product-list.component';
@NgModule({
  declarations: [TabmenuComponent,ProductListComponent],
  imports: [CommonModule, IonicModule],
  exports:[TabmenuComponent, ProductListComponent],
})
export class ShareModule {}