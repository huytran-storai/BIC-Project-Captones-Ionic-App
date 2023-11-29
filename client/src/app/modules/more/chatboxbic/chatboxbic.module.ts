import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatboxbicPageRoutingModule } from './chatboxbic-routing.module';
import { ChatboxbicPage } from './chatboxbic.page';
import { ChatbotService } from 'src/app/services/chatbot.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatboxbicPageRoutingModule
  ],
  declarations: [ChatboxbicPage],
  providers: [ChatbotService]
})
export class ChatboxbicPageModule {}
