import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection;
  private messagesSubject = new BehaviorSubject<any[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chatHub')
      .build();

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, { user, message }]);
    });

    this.hubConnection.start().catch(err => console.error(err));
  }

  sendMessage(receiverUserId: string, user: string, message: string) {
    this.hubConnection.invoke('SendMessageToUser', receiverUserId, message)
      .catch(err => console.error(err));
  }
}