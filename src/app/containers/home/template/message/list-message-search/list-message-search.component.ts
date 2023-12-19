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
  @Input() keySearch: string | undefined;

  datas: Group[] = [];
  chatId!: string;

  constructor(private chatBoardService: ChatBoardService) {}

  ngOnInit() {
    this.searchGroup();
  }
  searchGroup() {
    if(this.keySearch!= null){
      this.chatBoardService.searchChat(this.keySearch).subscribe({
        next: (response: any) => {
          this.datas = response;
          console.log(this.datas);
        },
        error: (error) => console.log('error: ', error),
      })
    }
  }

}
