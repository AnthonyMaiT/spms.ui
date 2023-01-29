import { ThisReceiver } from '@angular/compiler';
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ChatbotService } from './services/chatbot.service';
import { PredictMessage } from './predict'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'spms.ui';

  // hides toolbar
  hideToolBar = true;

  // chat variables and defaults
  showChat = false;
  messages = [{'name':'Sam', "message": "Hello! How may I help you?"}]
  userMessage = ""

  // router to check page and chat service for chatbot
  constructor(private route: Router, private chabbotService: ChatbotService) { }

  // checks page for certain criterias
  ngDoCheck(): void {
    // hides toolbar if on login page
    if (this.route.url === '/login') {
      this.hideToolBar = true
    } else {
      this.hideToolBar = false
    }
  }
  
  // toggles chat on and off
  toggleChat() {
    this.showChat = !this.showChat
  }

  // adds message to list, sends message to bot and then add bot message to list
  sendMessage() {
    this.messages.unshift({"name": "user", "message": this.userMessage})
    const predictMessage: PredictMessage = {
      message: this.userMessage
    }
    this.userMessage = ''
    this.chabbotService.predictMessage(predictMessage).subscribe((data) => {
      this.messages.unshift({"name": data.name, "message": data.message})
    })
  }
}
