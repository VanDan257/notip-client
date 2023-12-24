import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { saveAs } from 'file-saver';

import { Message } from 'src/app/core/models/message';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CallService } from 'src/app/core/service/call.service';
import { ChatBoardService } from 'src/app/core/service/chat-board.service';
import * as moment from 'moment';
import {SocketService} from "../../../../../core/service/socket.service";
import {UserService} from "../../../../../core/service/user.service";
import {ToastrService} from "ngx-toastr";

declare const $: any;

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent implements OnInit {
  @Input() group!: any;
  @Input() contact!: User;

  currentUser: any = {};
  messages: Message[] = [];
  textMessage: string = '';
  groupInfo: any = null;
  contactSearchs: User[] = [];
  isGroup!: boolean;

  constructor(
    private callService: CallService,
    private chatBoardService: ChatBoardService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private socketService: SocketService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.getMessage();

    this.socketService.onMessageReceived().subscribe({
      next: (response) => {
        let payload: any = response
        this.messages.push(payload.payload);
      }
    })

    $('#my-text').emojioneArea({
      events: {
        keydown: function (editor: any, event: KeyboardEvent) {
          console.log('event:keydown');
        },
      },
    });

    let timeoutId: any;
    $('#search-contact-add-group').on('input', () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        this.searchContact($('#search-contact-add-group').val());
      }, 300);
    })
  }


  mess() {}

  ngOnChanges(changes: SimpleChanges): void {

    this.getMessage();
    this.getChatBoardInfo();
    $('.main-box-chat').removeClass('box-contact-info-opened');
  }

  getChatBoardInfo() {
    this.chatBoardService
      .getChatBoardInfo(this.group == null ? '' : this.group.id)
      .subscribe({
        next: (response: any) => {
          this.groupInfo = response;
          console.log(this.groupInfo);
          this.isGroup = this.groupInfo.chat.typeChatId == 2;
        },
        error: (error) => console.log('error: ', error),
      });
  }

  getMessage() {
    if (this.group != null) {
      this.getMessageByGroup();
    }
  }

  getMessageByGroup() {

    this.chatBoardService.getMessageByGroup(this.group?.id).subscribe({
      next: (response: any) => {
        this.messages = response;
      },
      error: (error) => console.log('error: ', error),
    });
  }

  toggleContact() {
    if ($('.main-box-chat').hasClass('box-contact-info-opened')) {
      $('.main-box-chat').removeClass('box-contact-info-opened');
    } else {
      $('.main-box-chat').addClass('box-contact-info-opened');
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (!event.shiftKey && event.code == 'Enter') {
      this.sendMessage();
      event.preventDefault();
    }
  }

  sendMessage() {
    this.textMessage = `${this.textMessage}${$('#my-text')
      .emojioneArea({})
      .val()}`;
    if (this.textMessage == null || this.textMessage.trim() == '') return;

    console.log('currentUser: ', this.currentUser)
    const currentDateTime = moment();
    const message = {
      chatId: this.group == null ? '' : this.group.id,
      content: this.textMessage.trim(),
      type: 'text',
      senderId: this.currentUser.id,
      senderName: this.currentUser.name,
      senderPhoto: this.currentUser.photoUrl,
      createdAt: currentDateTime.format('YYYY-MM-DD HH:mm:ss')
    };

    this.chatBoardService.sendMessage(message).subscribe({
      next: (response: any) => {
        this.textMessage = ''
        this.socketService.sendMessage({payload: message, chatName: this.group.chatName});
        console.log('response: ', response)
        this.messages.push(response)
      },
      error: (error) => console.log('error: ', error),
    });

    $('.emojionearea-editor').html('');
  }

  sendFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesToUpload: any[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        filesToUpload.push(event.target.files[i]);
      }
      const formData = new FormData();
      Array.from(filesToUpload).map((file, index) => {
        formData.append('files', file, file.name);
      });
      formData.append('chatId', this.group.id);
      formData.append('file', filesToUpload[0]);
      formData.append('content', filesToUpload[0].name);
      formData.append('type', 'attachment');

      this.chatBoardService.sendMessage(formData).subscribe({
        next: (response: any) => {
          this.textMessage = ''
          this.socketService.sendMessage({payload: response, chatName: this.group.chatName});
          this.messages.push(response)
        },
        error: (error) => console.log('error: ', error),
      });
    }
  }

  sendImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesToUpload: any[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        filesToUpload.push(event.target.files[i]);
      }

      const formData = new FormData();

      formData.append('file', filesToUpload[0]);
      formData.append('chatId', this.group.id);
      formData.append('type', 'media');

      this.chatBoardService.sendMessage(formData).subscribe({
        next: (response: any) => {
          this.textMessage = ''
          this.socketService.sendMessage({payload: response, chatName: this.group.chatName});
          this.messages.push(response)
        },
        error: (error) => console.log('error: ', error),
      });
    }
  }

  renameGroup(){

  }

  updateGroupAvatar(evt: any) {

    if (evt.target.files && evt.target.files[0]) {
      let filesToUpload: any[] = [];
      for (let i = 0; i < evt.target.files.length; i++) {
        filesToUpload.push(evt.target.files[i]);
      }

      const formData = new FormData();

      formData.append('file', filesToUpload[0]);
      formData.append('chatId', this.group.id);

      this.chatBoardService.updateGroupAvatar(formData).subscribe({
        next: () => {
          this.getChatBoardInfo();
        },
        error: (error) => console.log('error: ', error),
      });
    }
  }

  downloadFile(path: any, fileName: any) {
    this.chatBoardService.downloadFileAttachment(path).subscribe({
      next: (response) => saveAs(response, fileName),
      error: (error) => console.log('error: ', error),
    });
  }

  callVideo() {
    this.callService.call(this.groupInfo.Code).subscribe({
      next: (response: any) => {
        let data = JSON.parse(response['data']);
        $('#outgoingCallIframe').attr('src', data);
        $('#modalOutgoingCall').modal();
        console.log('callVideo', data);
      },
      error: (error) => console.log('error: ', error),
    });
  }

  openModalAddContact() {
    // this.filter.keySearch = '';
    // this.contactSearchs = [];
    $('#modalAddContact').modal();
  }

  searchContact(data: any) {
    this.userService.searchContact(data).subscribe({
      next: (response: any) => {
        this.contactSearchs = response;
      },
      error: (error) => console.log('error: ', error),
    });
  }
  //
  submitAddContact(contact: any) {
    // console.log(contact.id, this.currentGroup.id)
    this.userService.addContact({userId: contact.id, chatId: this.groupInfo.chat.id}).subscribe({
      next: (response: any) => {
        this.getChatBoardInfo();
        this.toastr.success('Thêm thành công');
        $('#modalAddContact').modal('hide');
      },
      error: (error) => console.log('error: ', error),
    });
  }

}
