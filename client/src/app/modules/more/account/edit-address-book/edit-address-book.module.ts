import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAddressBookPageRoutingModule } from './edit-address-book-routing.module';

import { EditAddressBookPage } from './edit-address-book.page';

import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoModule,
    EditAddressBookPageRoutingModule
  ],
  declarations: [EditAddressBookPage]
})
export class EditAddressBookPageModule { }
