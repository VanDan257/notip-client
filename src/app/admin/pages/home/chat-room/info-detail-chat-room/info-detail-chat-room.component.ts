import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ChatroomService} from "../../../../services/chatroom.service";
import {ToastrService} from "ngx-toastr";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-info-detail-chat-room',
  templateUrl: './info-detail-chat-room.component.html',
  styleUrls: ['./info-detail-chat-room.component.css']
})
export class InfoDetailChatRoomComponent implements OnInit{
  idChatRoom!: string;
  constructor(private router: Router, private chatRoomService: ChatroomService, private toastr: ToastrService) {}

  ngOnInit() {
    const arrayUrl = this.router.url.split('/');
    this.idChatRoom = arrayUrl[arrayUrl.length - 1];
    this.getInfoChatRoom();
  }

  getInfoChatRoom(){
    this.chatRoomService.getDetailChatAdmin(parseInt(this.idChatRoom)).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: err => this.toastr.error('', err, {
        timeOut: 2000
      })
    })
  }

}
