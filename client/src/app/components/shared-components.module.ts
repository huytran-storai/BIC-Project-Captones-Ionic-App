import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabmenuComponent } from './tabmenu/tabmenu.component';
import { ProductListComponent } from '../modules/product/components/product-list/product-list.component';
// import { ProductDetailsComponent } from '../modules/product/components/product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { BlogsComponent } from '../modules/home/components/blogs/blogs.component';
import { PromoComponent } from '../modules/home/components/promos/promos.component';
import { WinegroupComponent } from '../modules/home/components/winegroup/winegroup.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TabmenuComponent, ProductListComponent, BlogsComponent, PromoComponent, WinegroupComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [TabmenuComponent, ProductListComponent, BlogsComponent, PromoComponent, WinegroupComponent],
})
export class ShareModule { }