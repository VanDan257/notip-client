import { environment } from 'src/environments/environment';

export class AppRoutingApi {
  static Login = environment.apiUrl + 'account/login';
  static SignUp = environment.apiUrl + 'account/register';
  //static Image = environment.apiUrl + "img";
  static DownloadFile = environment.apiUrl + 'file';
  static PostHubConnection = environment.apiUrl + 'post-hubconnection';

  static GetChatHistory = environment.apiUrl + 'chat/get-all-chat';
  static GetChatBoardInfo = environment.apiUrl + 'chat/get-info-chat';
  static SearchChat = environment.apiUrl + 'chat/search-chat';
  static AddGroup = environment.apiUrl + 'chat/groups';
  static SendMessage = environment.apiUrl + 'message/send-message';
  static GetMessageByGroup = environment.apiUrl + 'message/get-messages';
  static GetMessageByContact =
    environment.apiUrl + 'chatBoards/get-message-by-contact';
  static UpdateGroupAvatar =
    environment.apiUrl + 'chat/update-photo-chat';

  static GetCallHistory = environment.apiUrl + 'calls/get-history';
  static GetCallHistoryById = environment.apiUrl + 'calls/get-history';
  static Call = environment.apiUrl + 'calls/call';
  static JoinVideoCall = environment.apiUrl + 'calls/join-video-call';
  static CancelVideoCall = environment.apiUrl + 'calls/cancel-video-call';

  static GetProfile = environment.apiUrl + 'users/profile';
  static UpdateProfile = environment.apiUrl + 'users/profile';
  static GetContact = environment.apiUrl + 'users/contacts';
  static SearchContact = environment.apiUrl + 'user/search';
  static AddContact = environment.apiUrl + 'users/contacts';
}
