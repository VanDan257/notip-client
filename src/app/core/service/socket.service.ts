import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';import { AppRoutingApi } from 'src/app/app-routing-api';
import { environment } from "../../../environments/environment";
import {Message} from "../models/message";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private chatUrl = environment.chatHub;
  private socket: Socket;
  private messageSubject: Subject<any> = new Subject<any>();
  constructor() {
    this.socket = io('http://localhost:3000'); // Đổi URL tới máy chủ của bạn
    this.setupSocketListeners();
  }
  private setupSocketListeners() {
    this.socket.on('connected', () => {
      console.log('Connected to server');
    });

    // Thêm các sự kiện khác tại đây
    // Ví dụ: this.socket.on('message received', (data) => { /* xử lý dữ liệu */ });
  }
  setup(userData: any) {
    this.socket.emit('setup', userData);
  }

  joinRoom(room: string) {
    this.socket.emit('join room', room);
  }

  getMessage(){
    this.socket.on("message recieved", (newMessage)=>{

    })
  }

  sendTyping(room: string) {
    this.socket.emit('typing', room);
  }

  sendStopTyping(room: string) {
    this.socket.emit('stop typing', room);
  }

  sendMessage(newMessage: any) {
    this.socket.emit('new message', newMessage);
  }

  // onConnected() {
  //   return this.socket.fromEvent('connected');
  // }
  //
  // onTyping() {
  //   return this.socket.fromEvent('typing');
  // }
  //
  // onStopTyping() {
  //   return this.socket.fromEvent('stop typing');
  // }

  // onMessageReceived() {
  //   return this.socket.fromEvent('message received');
  // }
}
