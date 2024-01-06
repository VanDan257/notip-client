import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ChatroomService} from "../../../../services/chatroom.service";
import {ToastrService} from "ngx-toastr";
import {error} from "@angular/compiler-cli/src/transformers/util";

declare const $: any;

@Component({
  selector: 'app-info-detail-chat-room',
  templateUrl: './info-detail-chat-room.component.html',
  styleUrls: ['./info-detail-chat-room.component.css']
})
export class InfoDetailChatRoomComponent implements OnInit{
  idChatRoom!: string;
  infoChat!: any;
  memberDelete: any | undefined;

  pageSizeMessages = 10; // Số lượng mục trên mỗi trang
  pageNumberMessages = 1;
  pageSizeMembers = 10; // Số lượng mục trên mỗi trang
  pageNumberMembers = 1;

  constructor(private router: Router, private chatRoomService: ChatroomService, private toastr: ToastrService) {}

  ngOnInit() {
    const arrayUrl = this.router.url.split('/');
    this.idChatRoom = arrayUrl[arrayUrl.length - 1];
    this.getInfoChatRoom();
  }

  getInfoChatRoom(){
    this.chatRoomService.getDetailChatAdmin(parseInt(this.idChatRoom)).subscribe({
      next: (response: any) => {
        this.infoChat = response;
        console.log(this.infoChat);
      },
      error: err => this.toastr.error('', err, {
        timeOut: 2000
      })
    })
  }

  onDeleteMember(memberDelete: any){
    this.memberDelete = memberDelete
    $('#modalDeleteMember').modal();
  }

  deleteMember(userId: any){
    this.chatRoomService.removeMemberInGroup(userId).subscribe({
      next: _ => {
        this.getInfoChatRoom();
        this.toastr.success('', 'Xóa người dùng khỏi phòng chat thành công!', {
          timeOut: 2000
        })
        $('modalDeleteMember').modal('hide');
      },
      error: err => {
        this.toastr.error('', 'Xóa người dùng khỏi phòng chat không thành công!', {
          timeOut: 2000
        })
      }
    })
  }

}
