import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './components/shared-components.module';
import { UserRegisterService } from './services/user-register.service';
import { HttpClientModule } from '@angular/common/http';
import { MaskitoModule } from '@maskito/angular';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }), AppRoutingModule, MaskitoModule, ShareModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserRegisterService],
  bootstrap: [AppComponent],
})
export class AppModule { }
