import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';
@Component({
  selector: 'app-chatboxbic',
  templateUrl: './chatboxbic.page.html',
  styleUrls: ['./chatboxbic.page.scss'],
})
export class ChatboxbicPage {

  messages: string[] = [];
  userInput: string = '';

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    this.messages.push(`You: ${this.userInput}`);
    
    this.chatbotService.sendMessage(this.userInput)
      .subscribe((response: any) => {
        const botResponse = response.queryResult.fulfillmentText;
        this.messages.push(`Bot: ${botResponse}`);
      });

    this.userInput = '';
  }

}


