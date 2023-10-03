import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabmenuComponent } from './tabmenu/tabmenu.component';
import { ProductListComponent } from '../modules/product/components/product-list/product-list.component';
import { ProductDetailsComponent } from '../modules/product/components/product-details/product-details.component';
import {RouterModule} from '@angular/router';
import {BlogsComponent} from '../modules/home/components/blogs/blogs.component';
import { NewsComponent } from '../modules/home/components/news/news.component';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TabmenuComponent,ProductListComponent,ProductDetailsComponent, BlogsComponent, NewsComponent],
  imports: [CommonModule, IonicModule,RouterModule],
  exports:[TabmenuComponent, ProductListComponent,ProductDetailsComponent, BlogsComponent, NewsComponent],
})
export class ShareModule {}