import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Group} from "../../../../../core/models/group";
import {ChatBoardService} from "../../../../../core/service/chat-board.service";

@Component({
  selector: 'app-list-message-search',
  templateUrl: './list-message-search.component.html',
  styleUrls: ['./list-message-search.component.css']
})
export class ListMessageSearchComponent {
  @Output() onClick = new EventEmitter<Group>();
  @Output() keySearch = new EventEmitter<Group>();

  datas: Group[] = [];
  chatId!: string;

  constructor(private chatBoardService: ChatBoardService) {}

  ngOnInit() {
    // this.searchGroup();
  }

  openMessage(chatId: any) {
    this.chatId = chatId;
    this.onClick.emit(this.datas.find((x) => x.id == chatId));
  }

  searchGroup(search: string) {
    if(this.keySearch!= null){
      this.chatBoardService.searchChat(search).subscribe({
        next: (response: any) => {
          this.datas = response;
          console.log(this.datas);
        },
        error: (error) => console.log('error: ', error),
      })
    }
  }

}
