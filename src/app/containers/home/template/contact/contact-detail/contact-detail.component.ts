import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CallService } from 'src/app/core/service/call.service';
import {UserService} from "../../../../../core/service/user.service";
import {User} from "../../../../../core/models/user";
import {FriendService} from "../../../../../core/service/friend.service";

declare const $: any;
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnChanges {
  @Input() contact!: any;
  contacts: User[] = [];
  keySearchFriend!: string;
  keySearchInvitationFriend!: string;
  title: string = "Lời mời kết bạn";

  toggleTabChat: boolean = false;

  constructor(
    private callService: CallService,
    private userService: UserService,
    private friendService: FriendService
  ) { }

  ngOnInit() {
    if (this.contact === null || this.contact === undefined) {
      this.contact = 1;
    }
    this.getListFriendInvites();

    let timeoutId: any;

    $(document).ready(() => {
      $('.search-contact-input-invite-friend').on('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          this.userService.searchContact($('.search-contact-input-invite-friend').val()).subscribe({
            next: (response: any) => {
              this.contacts = response;
              console.log(this.contacts);
            }
          })
        }, 300);
      })
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
      next: (response: any) => {this.contacts = response},
      error: (e) => console.log(e)
    });
  }

  getListFriendInvites(){
    this.friendService.getListFriendInvites().subscribe({
      next: (response: any) => {this.contacts = response},
      error: (e) => console.log(e)
    });
  }

  chat() {
    this.toggleTabChat = true;
  }
}
