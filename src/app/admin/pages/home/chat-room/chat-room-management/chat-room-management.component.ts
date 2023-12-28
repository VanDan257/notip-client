import {Component, OnInit} from '@angular/core';
import {ChatroomService} from "../../../../services/chatroom.service";

@Component({
  selector: 'app-chat-room-management',
  templateUrl: './chat-room-management.component.html',
  styleUrls: ['./chat-room-management.component.css']
})
export class ChatRoomManagementComponent implements OnInit{
  chats: any[]=[];

  constructor(private chatService: ChatroomService) {}

    ngOnInit() {
    this.getAllChatRoom();
    }

    getAllChatRoom(){
    this.chatService.getAllChatAdmin().subscribe({
        next: (response: any) => {
          this.chats = response;
          console.log(this.chats);
        }
    })
  }

}
