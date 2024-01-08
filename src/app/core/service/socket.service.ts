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

export class SocketService {
  constructor(private socket: Socket) {
    this.socket.connect();
  }
  setup(name: string) {
    this.socket.emit('setup', name);
  }

  joinRoom(room: string) {
    this.socket.emit('join-room', room);
  }

  sendMessage(payload: any) {
    this.socket.emit('new-message', payload);
  }

  onMessageReceived() {
    return this.socket.fromEvent('message-received');
  }

  sendOffer(data: any) {
    return this.socket.emit('offer', data)
  }

  sendAnswer(data: any){
    return this.socket.emit('answer', data)
  }

  iceCandidate(data: any){
    return this.socket.emit('ice-candidate', data);
  }

  onOffer() {
    return this.socket.fromEvent('offer');
  }

  onAnswer() {
    return this.socket.fromEvent('answer');
  }

  onIceCandidate(){
    return this.socket.fromEvent('ice-candidate');
  }

}
