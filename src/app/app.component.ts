import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
  <div>
    <input [(ngModel)]="user" placeholder="Enter your name" />
    <input [(ngModel)]="groupName" placeholder="Enter chat group" />
    <button (click)="joinChat()">Join Chat</button>
    
    <input [(ngModel)]="message" placeholder="Enter message" />
    <button (click)="sendMessage()">Send</button>
  </div>
  <div *ngFor="let msg of messages">
    <strong>{{ msg.user }}</strong>: {{ msg.message }}
  </div>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user = '';
  message = '';
  recipientUser: string = '';
  messages$ = this.chatService.messages$;
  groupName: string='';

  //user: string;
  //message: string;
  messages: { user: string; message: string }[] = [];


  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.addReceiveMessageListener((user, message) => {
      this.messages.push({ user, message });
    });
  }

  joinChat() {
    this.chatService.joinChat(this.groupName);
  }

  sendMessage() {
    this.chatService.sendMessage(this.groupName, this.user, this.message);
    this.message = '';
  }
}