import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user = '';
  message = '';
  recipientUser: string = '';
  messages$ = this.chatService.messages$;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (this.user && this.message) {
      this.chatService.sendMessage(this.recipientUser,this.user, this.message);
      this.message = '';
    }

    console.log('msgh',  this.messages$);
  }
}