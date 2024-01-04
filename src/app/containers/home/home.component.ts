import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { ListMessageComponent } from './template/message/list-message/list-message.component';
import { ListCallComponent } from './template/call/list-call/list-call.component';
import { ListContactComponent } from './template/contact/list-contact/list-contact.component';

import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CallService } from 'src/app/core/service/call.service';
import { ChatBoardService } from 'src/app/core/service/chat-board.service';
import { UserService } from 'src/app/core/service/user.service';
import { Constants } from 'src/app/core/utils/constants';
import {SocketService} from "../../core/service/socket.service";
import {ListMessageSearchComponent} from "./template/message/list-message-search/list-message-search.component";

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('listMessage', { static: true }) listMessage!: ListMessageComponent;
  @ViewChild('listCall', { static: true }) listCall!: ListCallComponent;
  @ViewChild('listMessageSearch', { static: true }) listMessageSearch!: ListMessageSearchComponent;
  @ViewChild('listContact', { static: true }) listContact!: ListContactComponent;

  search: string = '';
  currentUser: any = {};
  currentGroup: any = {};
  userProfile: User | any = {};

  tabControls: any[] = [
    {
      title: 'Tin nhắn',
      iconClass: 'mdi-message-text',
    },
    {
      title: 'Cuộc gọi',
      iconClass: 'mdi-phone',
    },
    {
      title: 'Danh bạ',
      iconClass: 'mdi-account-box-outline',
    },
    {
      title: 'Thông báo',
      iconClass: 'mdi-bell-outline',
    },
  ];

  tabIndexSelected: number = 0;

  userSearchInNewGroup: User[] = [];
  userSelctedInNewGroup: User[] = [];
  contactSearchs: User[] = [];

  receivedMessages: any[] = [];

  filter = {
    keySearch: '',
    groupName: '',
    group: null,
    contact: null,
    groupCall: null,
  };

  constructor(
    private authService: AuthenticationService,
    private callService: CallService,
    private chatBoardService: ChatBoardService,
    private userService: UserService,
    private ngZone: NgZone,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private socketService: SocketService,
    private inpFileElement: ElementRef
  ) {}

  public messageArray: {user: string, message: string}[] = [];

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    // lắng nghe cuôc gọi đến => xử lý
    // this.signalRService.hubConnection.on('callHubListener', (data) => {
    //   this.openModalCall(data);
    // });

    this.socketService.onMessageReceived().subscribe({
      next: (response) => {
        this.listMessage.getData()
      }
    })

    this.socketService.setup(this.currentUser.name);

    // search group chat or user to chat
    let timeoutId: any;
    $('#search-contact').on('input', () => {
      this.tabIndexSelected = 4;
      if(this.search)
      {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          this.listMessageSearch.searchGroup(this.search)
        }, 300);
      }
    })

    $('#search-contact').on('blur', () => {
      if ($('.tab-header-search-input').val() == ""){
        this.tabIndexSelected = 0;
      }
    });

    let timeoutSearchUser: any;
    // search user to create group
    $('.input-member').on('input', () => {
      clearTimeout(timeoutSearchUser);
      timeoutSearchUser = setTimeout(() => {
        if($('.input-member').val() != null || $('.input-member').val() != undefined){
          this.userService.searchContact($('.input-member').val()).subscribe({
            next: (response: any) => {
              this.userSearchInNewGroup = response;
              if(this.userSelctedInNewGroup.length > 0){
                this.userSearchInNewGroup = this.userSearchInNewGroup.filter((x) => {
                  // Check if x.id is not present in this.userSelctedInNewGroup
                  return !this.userSelctedInNewGroup.some((user) => user.id === x.id);
                });
              }
            },
            error: (err) => {
              this.toastr.error(err);
            }
          })
        }
      }, 300);
    })
  }

  clickTab(tabIndex: any) {
    this.tabIndexSelected = tabIndex;
  }

  onClickMessage(group: any) {
    this.filter.group = group;
    this.currentGroup = group
  }

  onClickContact(contact: any) {
    this.filter.contact = contact;
  }

  searchContact(data: any) {
    this.userService.searchContact(data).subscribe({
      next: (response: any) => {
        this.contactSearchs = response;
      },
      error: (error) => {
        this.toastr.error('', error, {
          timeOut: 2000,
        });
      },
    });
  }

  openModalProfile() {
    this.spinner.show();
    this.userService
      .getProfile()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe({
        next: (response: any) => {
          this.userProfile = response;
          $('#modalProfile').modal();
        },
        error: (error) => {
          this.toastr.error('', error, {
            timeOut: 2000,
          });
        },
      });
  }

  onloadAvatar(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      let filesToUpload: any[] = [];
      for (let i = 0; i < evt.target.files.length; i++) {
        filesToUpload.push(evt.target.files[i]);
      }
      const file = new FormData();

      file.append('file', filesToUpload[0]);

      this.userService.updateAvatar(file).subscribe({
        next: (response) => {
          let user: any = response;

          this.currentUser.photoUrl = user.avatar;

          this.authService.updateCurrentUser(this.currentUser);
          this.toastr.success('Cập nhật thành công ảnh đại diện', 'Thông tin cá nhân', {
            timeOut: 2000,
          });
        },
        error: (error) => {
          this.toastr.error('', error, {
            timeOut: 2000,
          });
        },
      });
    }
  }

  updateProfile() {
    this.spinner.show();
    this.userService
      .updateProfile(this.userProfile)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe({
        next: (response: any) => {
          this.userProfile = response;
          this.toastr.success('Cập nhật thành công', 'Thông tin cá nhân', {
            timeOut: 2000,
          });
          this.currentUser.name = this.userProfile.name;
          this.authService.updateCurrentUser(this.currentUser);
          $('#modalProfile').modal('hide');
        },
        error: (error) =>
          this.toastr.error('Cập nhật thất bại', 'Thông tin cá nhân', {
            timeOut: 2000,
          }),
      });
  }

  //#endregion

  //#region thêm mới nhóm chat

  openModalAddGroup() {
    this.filter.groupName = '';
    $('#modalAddGroup').modal();
  }

  addMemberToGroup(member: User) {
    this.userSelctedInNewGroup.push(member);
    console.log(this.userSelctedInNewGroup);
    this.userSearchInNewGroup = this.userSearchInNewGroup.filter((x) => {
      // Check if x.id is not present in this.userSelctedInNewGroup
      return !this.userSelctedInNewGroup.some((user) => user.id === x.id);
    });
  }

  removeMemberToGroup(member: User) {
    this.userSelctedInNewGroup = this.userSelctedInNewGroup.filter((value) => value.id != member.id)
  }

  submitAddGroup() {
    if (this.filter.groupName == null || this.filter.groupName.trim() == '') {
      this.toastr.error('Tên nhóm không được để trống', 'Tạo nhóm', {
        timeOut: 2000,
      });
      return;
    }

    if (this.userSelctedInNewGroup.length == 0) {
      this.toastr.error(
        'Danh sách thành viên không được để trống',
        'Thành viên nhóm',
        {
          timeOut: 2000,
        }
      );
      return;
    }

    this.chatBoardService
      .addGroup({
        chatName: this.filter.groupName,
        users: this.userSelctedInNewGroup,
      })
      .subscribe({
        next: (response: any) => {
          this.filter.group = response;
          this.currentGroup = response;
          this.toastr.success('', 'Tạo nhóm thành công', {
            timeOut: 2000,
          });
          $('#modalAddGroup').modal('hide');
          this.listMessage.getData();
        },
        error: (error) =>
          this.toastr.error('Có lỗi xảy ra', 'Tạo nhóm thất bại', {
            timeOut: 2000,
          }),
      });
  }

  //#endregion

  openModalCall(url: any) {
    if (confirm('Có cuộc gọi đến')) {
      this.callService
        .joinVideoCall($('#inComingCallIframe').attr('src'))
        .subscribe({
          next: (response: any) => {
            $('#modalInComingCall').modal();
            $('#inComingCallIframe').attr('src', url);
          },
          error: (error) => console.log('error: ', error),
        });
    }
  }

  rejectCall() {
    $('#modalInComingCall').modal('hide');
    $('#inComingCallIframe').attr('src', '');
    this.listCall.getData();
  }

  cancelVideoCall() {
    this.callService
      .cancelVideoCall($('#outgoingCallIframe').attr('src'))
      .subscribe({
        next: (response: any) => {
          $('#modalOutgoingCall').modal('hide');
          $('#outgoingCallIframe').attr('src', '');
          this.listCall.getData();
        },
        error: (error) => console.log('error: ', error),
      });
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }

  chooseFile() {
    this.inpFileElement.nativeElement.click();
  }

  // onFileChange(evt: any) {
  //   if (evt.target.files && evt.target.files[0]) {
  //     let filesToUpload: any[] = [];
  //     for (let i = 0; i < evt.target.files.length; i++) {
  //       filesToUpload.push(evt.target.files[i]);
  //     }
  //
  //     const file = new FormData();
  //
  //     file.append('file', filesToUpload[0]);
  //
  //     this.userService.updateAvatar(file).subscribe({
  //       next: (response) => {
  //         console.log('response: ', response);
  //         this.onloadAvatar();
  //       },
  //       error: (error) => console.log('error: ', error),
  //     });
  //   }
  // }
}
