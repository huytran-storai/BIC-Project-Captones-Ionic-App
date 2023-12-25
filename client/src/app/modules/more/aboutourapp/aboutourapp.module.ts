import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutourappPageRoutingModule } from './aboutourapp-routing.module';

import { AboutourappPage } from './aboutourapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutourappPageRoutingModule
  ],
  declarations: [AboutourappPage]
})
export class AboutourappPageModule {}
