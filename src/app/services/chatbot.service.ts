import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BotMessage } from '../botMessage';
import { PredictMessage } from '../predict';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }

  // sends a message to api and bot would return a message.
  predictMessage(message: PredictMessage) {
    return this.http.post<BotMessage>(environment.apiUrl+'/predict', message, {withCredentials: true})
  }
}
