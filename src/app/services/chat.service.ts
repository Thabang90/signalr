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
  }

  startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  joinChat(groupName: string) {
    this.hubConnection.invoke('JoinChat', groupName)
      .catch((err) => console.error(err));
  }

  sendMessage(groupName: string, user: string, message: string) {
    this.hubConnection.invoke('SendMessage', groupName, user, message)
      .catch((err) => console.error(err));
  }

  addReceiveMessageListener(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

}