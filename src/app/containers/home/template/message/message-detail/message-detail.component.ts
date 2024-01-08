import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs/operators";

declare const $: any;

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent implements OnInit, AfterViewChecked {
  @Input() group!: any;
  @Input() contact!: User;

  private localStream!: MediaStream;
  private pc!: RTCPeerConnection;

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
    private spinner: NgxSpinnerService,
  ) {}

  @ViewChild('scroll') private myScrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngOnInit() {
    // xử lý call video
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.localStream = stream;
        const videoElement = document.getElementById('localVideo') as HTMLVideoElement;
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    this.socketService.onOffer().subscribe({
      next: (data) => {
        // Xử lý offer từ người gọi
        if(!this.pc){
        }
      }
    })

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
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.getMessage();
    this.getChatBoardInfo();
    $('.main-box-chat').removeClass('box-contact-info-opened');
  }

  startCall(room: any){
    if(!this.pc){
      this.createPeerConnection();
    }
    this.pc.createOffer().then((offer) => {
      this.pc.setLocalDescription(offer);
      this.socketService.sendOffer({senderName: this.currentUser.name, room: this.groupInfo.chat.chatName, offer: offer})
    })
  }

  createPeerConnection(){
    this.pc = new RTCPeerConnection();

    // thêm local stream vào connection
    this.localStream.getTracks().forEach((track) => {
      this.pc.addTrack(track, this.localStream)
    })

    // xử lý ice-candidate gửi tới room
    this.pc.onicecandidate = (event) => {
      if(event.candidate){
        this.socketService.iceCandidate({
          targetId: this.group.chatName,
          candidate: event.candidate,
        })
      }
    }

    // xử lý remote stream
    this.pc.ontrack = (event) => {
      const remoteVideoElement = document.getElementById('remoteVideo') as HTMLVideoElement;
      remoteVideoElement.srcObject = event.streams[0];
    }
  }

  endCall(){

  }

  getChatBoardInfo() {
    if(this.group != null || this.group != undefined){
      this.chatBoardService.getChatBoardInfo(this.group.id).subscribe({
          next: (response: any) => {
            this.groupInfo = response;
            this.isGroup = this.groupInfo.chat.typeChatId == 2;
          },
          error: (error) => console.log('error: ', error),
        });
    }
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
    this.textMessage = `${$('#my-text')
      .emojioneArea({})
      .val()}`;
    console.log(this.textMessage);
    if (this.textMessage == null || this.textMessage.trim() == '') return;

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
        this.textMessage = '';
        $('.emojionearea-editor').innerHTML = '';
        this.socketService.sendMessage({payload: message, chatName: this.groupInfo.chat.chatName});
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
          setTimeout(() => {
            this.messages.push(response)
          }, 300)
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
    this.spinner.show();
    if (evt.target.files && evt.target.files[0]) {
      let filesToUpload: any[] = [];
      for (let i = 0; i < evt.target.files.length; i++) {
        filesToUpload.push(evt.target.files[i]);
      }

      const formData = new FormData();
      formData.append('file', filesToUpload[0]);
      formData.append('chatId', this.group.id);

      this.chatBoardService.updateGroupAvatar(formData).pipe(
          finalize(() => {
            this.spinner.hide();
          }))
       .subscribe({
        next: () => {
          this.spinner.show();
            this.getChatBoardInfo();
            this.toastr.success('', 'Cập nhật ảnh nhóm thành công!', {
              timeOut: 2000
            })
        },
        error: (error) => this.toastr.error('Cập nhật ảnh nhóm không thành công!', 'Đã có lỗi xảy ra', {
          timeOut: 2000
        }),
      });
    }
  }

  downloadFile(path: any, fileName: any) {
    this.chatBoardService.downloadFileAttachment(path).subscribe({
      next: (response) => saveAs(response, fileName),
      error: (error) => console.log('error: ', error),
    });
  }

  // callVideo() {
  //   this.callService.call(this.groupInfo.Code).subscribe({
  //     next: (response: any) => {
  //       let data = JSON.parse(response['data']);
  //       $('#outgoingCallIframe').attr('src', data);
  //       $('#modalOutgoingCall').modal();
  //       console.log('callVideo', data);
  //     },
  //     error: (error) => console.log('error: ', error),
  //   });
  // }

  openModalRemoveGroup(){
    $('#modalRemoveGroup').modal();
  }

  removeGroup(){
    this.chatBoardService.removeGroup(this.currentUser.id, this.group.id).subscribe({
      next: _ => {
        this.toastr.success('', 'Rời nhóm thành công!', {
          timeOut: 2000
        })
      },
      error: err => {
        this.toastr.success('Rời nhóm không thành công thành công!', 'Đã có lỗi xảy ra', {
          timeOut: 2000
        })
      }
    })
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
