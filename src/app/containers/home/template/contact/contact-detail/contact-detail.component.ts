import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CallService } from 'src/app/core/service/call.service';
import {UserService} from "../../../../../core/service/user.service";
import {User} from "../../../../../core/models/user";
import {FriendService} from "../../../../../core/service/friend.service";
import {ChatBoardService} from "../../../../../core/service/chat-board.service";
import {ToastrService} from "ngx-toastr";
import {SocketService} from "../../../../../core/service/socket.service";
import {Group} from "../../../../../core/models/group";
import {AuthenticationService} from "../../../../../core/service/authentication.service";

declare const $: any;
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnChanges {
  @Output() onClick = new EventEmitter<Group>();
  @Input() contact!: any;

  contacts: any[] = [];
  keySearchFriend!: string;
  keySearchInvitationFriend!: string;
  title: string = "Lời mời kết bạn";
  chatId!: string;
  toggleTabChat: boolean = false;
  currentUser!: User;

  constructor(
    private chatBoardService: ChatBoardService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private friendService: FriendService
  ) { }

  ngOnInit() {
    if (this.contact === null || this.contact === undefined) {
      this.contact = 1;
    }
    this.getListFriendInvites();
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.contact == 1){
      this.getListFriendInvites();
      this.title = "Lời mời kết bạn";
    }
    else if(this.contact == 2){
      this.getListFriends();
      this.title = "Danh sách bạn bè";
    }
  }

  getListFriends(){
    this.friendService.getListFriends().subscribe({
      next: (response: any) => {
        this.contacts = response
      },
      error: (e) => console.log(e)
    });
  }

  sendInviteFriend(recipientId: any) {
    this.friendService.sendInvite(recipientId).subscribe({
      next: _ => {
        this.searchUserFromInvitedFriendPage();
        this.toastr.success('', 'Gửi lời mời kết bạn thành công!', {
          timeOut: 2000
        })
      },
      error: err => {
        this.toastr.error('', 'Gửi lời mời kết bạn không thành công!', {
          timeOut: 2000
        })
      }
    })
  }

  acceptInviteFriend(senderId: any){
    this.friendService.acceptInvite(senderId).subscribe({
      next: _ => {
        this.searchUserFromInvitedFriendPage();
        this.toastr.success('', 'Đã thêm vào danh sách bạn bè thành công!', {
          timeOut: 2000
        })
      },
      error: err => {
        this.toastr.error('', 'Gửi lời mời kết bạn không thành công!', {
          timeOut: 2000
        })
      }
    })
  }

  getListFriendInvites(){
    this.friendService.getListFriendInvites().subscribe({
      next: (response: any) => {
        this.contacts = response
      },
      error: (e) => console.log(e)
    });
  }

  searchUserFromInvitedFriendPage(){
    console.log(this.keySearchInvitationFriend)
    this.friendService.searchUserFromInvitedFriendPage(this.keySearchInvitationFriend).subscribe({
      next: (response: any) => {
        console.log(response)
        this.contacts = response;
      }
    })
  }

  chat() {
    this.toggleTabChat = true;
  }

  accessChatRoom(user: any) {
    let chatCurrent: any;
    this.chatBoardService.accessChat(user.id).subscribe({
      next: (response: any) => {
        chatCurrent = response;
        console.log(chatCurrent);
      }, error: (err) => {
        this.toastr.error(err);
      }
    })
  }
}
