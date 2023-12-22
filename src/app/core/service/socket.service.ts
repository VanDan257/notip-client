import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { environment } from "../../../environments/environment";
import {Message} from "../models/message";
import {Observable, Subject} from "rxjs";
import {MessageDetailComponent} from "../../containers/home/template/message/message-detail/message-detail.component";

@Injectable({
  providedIn: 'root'
})
// export class SocketService {
//   private chatUrl = environment.chatHub;
//   private socket: Socket;
//   private messageSubject: Subject<any> = new Subject<any>();
//   constructor() {
//     this.socket = io(this.chatUrl);
//     this.setupSocketListeners();
//   }
//   private setupSocketListeners() {
//     this.socket.on('connected', () => {
//       console.log('Connected to server');
//     });
//   }
//   setup(userData: any) {
//     this.socket.emit('setup', userData);
//   }
//
//   joinRoom(room: string) {
//     this.socket.emit('join room', room);
//   }
//
//   listenForMessageReceived({message}: { message: any }) {
//     this.socket.on('message received', message);
//   }
//
//   getNewMessage(){
//     this.socket.on('message received', (data) => {console.log(data)});
//   }
//
//   sendTyping(room: string) {
//     this.socket.emit('typing', room);
//   }
//
//   sendStopTyping(room: string) {
//     this.socket.emit('stop typing', room);
//   }
//
//   sendMessage(newMessage: any) {
//     this.socket.emit('new message', newMessage);
//   }
//
//   // onConnected() {
//   //   return this.socket.fromEvent('connected');
//   // }
//   //
//   // onTyping() {
//   //   return this.socket.fromEvent('typing');
//   // }
//   //
//   // onStopTyping() {
//   //   return this.socket.fromEvent('stop typing');
//   // }
//
//   // onMessageReceived() {
//   //   return this.socket.fromEvent('message received');
//   // }
// }


export class SocketService {
  constructor(private socket: Socket, private messageDetail: MessageDetailComponent) {}
  setup(userData: any) {
    this.socket.emit('setup', userData);
  }

  joinRoom(room: string) {
    this.socket.emit('join-room', { chatId: room });
  }

  sendTyping(room: string) {
    this.socket.emit('typing', room);
  }

  sendStopTyping(room: string) {
    this.socket.emit('stop typing', room);
  }

  sendMessage(payload: any) {
    this.socket.emit('new-message', payload);
  }

  onConnected() {
    return this.socket.fromEvent('connected');
  }

  onTyping() {
    return this.socket.fromEvent('typing');
  }

  onStopTyping() {
    return this.socket.fromEvent('stop typing');
  }

  onMessageReceived() {
    return this.socket.on('message-received', (message: Message) => {
      // Xử lý dữ liệu nhận được khi sự kiện "message received" được gửi từ server
      this.messageDetail.getMessage();
    });
  }
}
