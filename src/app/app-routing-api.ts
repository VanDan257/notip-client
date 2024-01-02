import { environment } from 'src/environments/environment';

export class AppRoutingApi {
  static Login = environment.apiUrl + 'account/login';
  static SignUp = environment.apiUrl + 'account/register';
  //static Image = environment.apiUrl + "img";
  static DownloadFile = environment.apiUrl + 'file';

  static GetChatHistory = environment.apiUrl + 'chat/get-all-chat';
  static GetChatBoardInfo = environment.apiUrl + 'chat/get-info-chat';
  static SearchChat = environment.apiUrl + 'chat/search-chat';
  static AddGroup = environment.apiUrl + 'chat/create-chat';
  static SendMessage = environment.apiUrl + 'message/send-message';
  static GetMessageByGroup = environment.apiUrl + 'message/get-messages';
  static UpdateGroupAvatar = environment.apiUrl + 'chat/update-photo-chat';
  static AddContactIntoGroup = environment.apiUrl + 'chat/groupAdd';
  static AccessChat = environment.apiUrl + 'chat/access-chat';
  static RemoveGroup = environment.apiUrl + 'chat/remove-member-in-group';

  static GetCallHistory = environment.apiUrl + 'calls/get-history';
  static GetCallHistoryById = environment.apiUrl + 'calls/get-history';
  static Call = environment.apiUrl + 'calls/call';
  static JoinVideoCall = environment.apiUrl + 'calls/join-video-call';
  static CancelVideoCall = environment.apiUrl + 'calls/cancel-video-call';

  static GetProfile = environment.apiUrl + 'users/profile';
  static UpdateProfile = environment.apiUrl + '/user/updateProfile';
  static UpdateAvatar = environment.apiUrl + 'user/update-avatar';
  static SearchContact = environment.apiUrl + 'user/search';

  static SearchFriend = environment.apiUrl + 'friend/search-friend';
  static SearchUserFromInvitedFriendPage = environment.apiUrl + 'friend/search-friend-in-invited-page';
  static SendInviteFriend = environment.apiUrl + 'friend/send-invite';
  static AcceptInviteFriend = environment.apiUrl + 'friend/accept-invite';
  static BlockUser = environment.apiUrl + 'friend/block-invite';
  static GetListFriends = environment.apiUrl + 'friend/get-list-friend';
  static GetListFriendInvites = environment.apiUrl + 'friend/get-list-friend-invite';
}
