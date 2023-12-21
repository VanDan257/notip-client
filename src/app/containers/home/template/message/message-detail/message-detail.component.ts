import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { saveAs } from 'file-saver';

import { Message } from 'src/app/core/models/message';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CallService } from 'src/app/core/service/call.service';
import { ChatBoardService } from 'src/app/core/service/chat-board.service';
import { SignalRService } from 'src/app/core/service/signalR.service';
import { DataHelper } from 'src/app/core/utils/data-helper';
import {SocketService} from "../../../../../core/service/socket.service";

declare const $: any;

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent implements OnInit, AfterViewInit {
  @Input() group!: any;
  @Input() contact!: User;

  currentUser: any = {};
  messages: Message[] = [];
  textMessage: string = '';
  groupInfo: any = null;

  constructor(
    private callService: CallService,
    private chatBoardService: ChatBoardService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    // private signalRService: SignalRService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    console.log('on init');
    this.getMessage();

    $('#my-text').emojioneArea({
      events: {
        keydown: function (editor: any, event: KeyboardEvent) {
          console.log('event:keydown');
        },
      },
    });

    this.setupSocket();
  }

  setupSocket(){
    this.socketService.setup(this.currentUser.id);

    // Lắng nghe sự kiện "message recieved" từ máy chủ
    this.socketService.onMessageReceived();
    // .subscribe((message) => {
    //   console.log('Received message:', message);
    //   // Xử lý thông điệp nhận được từ máy chủ ở đây
    // });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  mess() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes');

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

    const message = {
      chatId: this.group == null ? '' : this.group.id,
      content: this.textMessage.trim(),
      type: 'text',
    };

    this.chatBoardService.sendMessage(message).subscribe({
      next: (response: any) => (this.textMessage = ''),
      error: (error) => console.log('error: ', error),
    });

    this.socketService.sendMessage(message);

    this.textMessage = '';

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
        next: (response: any) => (this.textMessage = ''),
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
        next: (response: any) => (this.textMessage = ''),
        error: (error) => console.log('error: ', error),
      });
    }
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
        next: (response: any) => (this.textMessage = ''),
        error: (error) => console.log('error: ', error),
      });
    }

    // const target: DataTransfer = <DataTransfer>evt.target;
    // if (target.files.length === 0) {
    //   return;
    // }
    // const reader: FileReader = new FileReader();
    // reader.onload = (e: any) => {
    //   try {
    //     var bytes = new Uint8Array(e.target.result);
    //     let img = 'data:image/png;base64,' + DataHelper.toBase64(bytes);
    //
    //     this.chatBoardService
    //       .updateGroupAvatar({
    //         id: this.groupInfo.id,
    //         photo: img,
    //       })
    //       .subscribe({
    //         next: (response: any) => {
    //           const grp = JSON.parse(response['data']);
    //           this.groupInfo.Avatar = grp.Avatar;
    //           this.group.Avatar = grp.Avatar;
    //         },
    //         error: (error) => console.log('error: ', error),
    //       });
    //   } catch (error) {
    //     alert('Lỗi ảnh');
    //   }
    // };
    // reader.readAsArrayBuffer(target.files[0]);
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
}
