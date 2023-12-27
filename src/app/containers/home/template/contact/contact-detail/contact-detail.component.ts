import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CallService } from 'src/app/core/service/call.service';
import {UserService} from "../../../../../core/service/user.service";
import {User} from "../../../../../core/models/user";
import {FriendService} from "../../../../../core/service/friend.service";
import {ChatBoardService} from "../../../../../core/service/chat-board.service";
import {ToastrService} from "ngx-toastr";
import {SocketService} from "../../../../../core/service/socket.service";
import {Group} from "../../../../../core/models/group";

declare const $: any;
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnChanges {
  @Output() onClick = new EventEmitter<Group>();
  @Input() contact!: any;

  contacts: User[] = [];
  keySearchFriend!: string;
  keySearchInvitationFriend!: string;
  title: string = "Lời mời kết bạn";
  chatId!: string;

  toggleTabChat: boolean = false;

  constructor(
    private chatBoardService: ChatBoardService,
    private toastr: ToastrService,
    private socketService: SocketService,
    private friendService: FriendService
  ) { }

  ngOnInit() {
    if (this.contact === null || this.contact === undefined) {
      this.contact = 1;
    }
    this.getListFriendInvites();

    $('#range-by-name-list-friend-invitation').on('input', () => {

    })
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

  getListFriendInvites(){
    this.friendService.getListFriendInvites().subscribe({
      next: (response: any) => {
        this.contacts = response
      },
      error: (e) => console.log(e)
    });
  }

  chat() {
    this.toggleTabChat = true;
  }

  accessChatRoom(user: any) {
    let chatCurrent: any;
    console.log('user: ', user)
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
