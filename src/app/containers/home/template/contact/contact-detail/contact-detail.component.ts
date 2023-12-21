import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CallService } from 'src/app/core/service/call.service';
import {UserService} from "../../../../../core/service/user.service";
import {User} from "../../../../../core/models/user";

declare const $: any;
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnChanges {
  @Input() contact!: any;
  contacts: User[] = [];
  keySearch!: string;
  title: string = "Lời mời kết bạn";

  toggleTabChat: boolean = false;

  constructor(
    private callService: CallService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.contact === null || this.contact === undefined) {
      this.contact = 1;
    }
    this.getListContacts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getListContacts();
    if(this.contact == 1)
      this.title = "Lời mời kết bạn";
    else if(this.contact == 2)
      this.title = "Danh sách bạn bè";
  }

  getListContacts(){
    this.userService.getContact(this.contact).subscribe({
      next: (response: any) => {this.contacts = response
        console.log(response)},
      error: (e) => console.log(e)
    });
  }

  chat() {
    this.toggleTabChat = true;
  }
}
