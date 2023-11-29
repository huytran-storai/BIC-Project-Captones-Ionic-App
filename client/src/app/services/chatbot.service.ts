import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private projectId = 'chatbot-oswk';
  private sessionId = 'd186bd50-3244-5388-2611-0c6a26b3ae37';

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    const url = `https://asia-northeast1-dialogflow.clients6.google.com/v2beta1/projects/${this.projectId}/agent/sessions/${this.sessionId}:detectIntent`;

    const request = {
      queryInput: {
        text: {
          text: message,
          languageCode: 'en'
        }
      }
    };

    return this.http.post(url, request);
  }
}