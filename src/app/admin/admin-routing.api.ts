import { environment } from 'src/environments/environment';

export class AdminRoutingApi {
  static LoginAdmin = environment.apiUrl + 'admin/user/login-admin';
  static CreateAccountAdmin = environment.apiUrl + 'admin/user/create-account-admin';

  static GetAllChatAdmin = environment.apiUrl + 'admin/chat/get-all-chat';
  static GetDetailChatAdmin = environment.apiUrl + 'admin/chat/get-detail-chat';
  static GetAllMessagesAdmin = environment.apiUrl + 'admin/chat/get-all-message';
}
