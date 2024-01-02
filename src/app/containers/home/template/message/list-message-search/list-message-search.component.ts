import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Group} from "../../../../../core/models/group";
import {ChatBoardService} from "../../../../../core/service/chat-board.service";
import {ToastrService} from "ngx-toastr";
import {SocketService} from "../../../../../core/service/socket.service";

@Component({
  selector: 'app-list-message-search',
  templateUrl: './list-message-search.component.html',
  styleUrls: ['./list-message-search.component.css']
})
export class ListMessageSearchComponent {
  @Output() onClick = new EventEmitter<Group>();
  @Output() keySearch = new EventEmitter<Group>();

  datas: Group[] = [];
  chatId: string = 'chatRoom';

  constructor(
    private chatBoardService: ChatBoardService,
    private toastr: ToastrService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    // this.searchGroup();
  }

  accessChatRoom(chat: any) {
    if(chat.id != null || chat.id != undefined){
      this.socketService.joinRoom(chat.chatName);
      this.onClick.emit(chat);
      this.chatId = chat.id;
    }
    else{
      let chatUser: any;
      this.chatBoardService.accessChat(chat.userId).subscribe({
        next: (response: any) => {
          chatUser = response;
          this.socketService.joinRoom(chatUser.chatName);
          this.onClick.emit(chatUser);
          this.chatId = chatUser.id;
        }, error: (err) => {
          this.toastr.error(err);
        }
      })
    }
  }

  searchGroup(search: string) {
    if(this.keySearch!= null){
      this.chatBoardService.searchChat(search).subscribe({
        next: (response: any) => {
          this.datas = response;
        },
        error: (error) => console.log('error: ', error),
      })
    }
  }

}
