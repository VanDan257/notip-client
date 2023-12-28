import {Component, OnInit} from '@angular/core';
import {ChatroomService} from "../../../../services/chatroom.service";

@Component({
  selector: 'app-chat-room-management',
  templateUrl: './chat-room-management.component.html',
  styleUrls: ['./chat-room-management.component.css']
})
export class ChatRoomManagementComponent implements OnInit{
  chats: any[]=[];
  // currentPage = 1;
  // pageSize = Math.ceil(this.chats.length/this.currentPage);

  constructor(private chatService: ChatroomService) {}

    ngOnInit() {
    this.getAllChatRoom();
    }

    getAllChatRoom(){
    this.chatService.getAllChatAdmin().subscribe({
        next: (response: any) => {
          this.chats = response;
        }
    })
  }

  // onPageChange(event: any) {
  //   this.currentPage = event.offset;
  //   this.getAllChatRoom(); // Hàm để tải dữ liệu mới
  // }

}
