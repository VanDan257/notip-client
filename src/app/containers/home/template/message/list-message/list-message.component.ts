import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/core/models/group';
import { ChatBoardService } from 'src/app/core/service/chat-board.service';
import {SocketService} from "../../../../../core/service/socket.service";

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css'],
})
export class ListMessageComponent implements OnInit {
  @Output() onClick = new EventEmitter<Group>();
  @Output() keySearch: string | undefined;

  datas: Group[] = [];
  chatId!: string;

  constructor(private chatBoardService: ChatBoardService, private socketService: SocketService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.chatBoardService.getHistory().subscribe({
      next: (response: any) => {
        this.datas = response;
      },
      error: (error) => console.log('error: ', error),
    });
  }

  openMessage(chatId: any) {
    this.chatId = chatId;
    this.onClick.emit(this.datas.find((x) => x.id == chatId));
    this.socketService.joinRoom(chatId);
  }
}
