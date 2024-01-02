import { environment } from 'src/environments/environment';

export class AdminRoutingApi {
  static LoginAdmin = environment.apiUrl + 'admin/user/login-admin';
  static CreateAccountAdmin = environment.apiUrl + 'admin/user/create-account-admin';
  static GetAllClients = environment.apiUrl + 'admin/user/get-all-client';
  static GetAllAdmins = environment.apiUrl + 'admin/user/get-all-admins';
  static DeleteAdmin = environment.apiUrl + 'admin/user/delete-admin';

  static GetAllChatAdmin = environment.apiUrl + 'admin/chat/get-all-chat';
  static GetDetailChatAdmin = environment.apiUrl + 'admin/chat/get-info-chat';
  static GetAllMessagesAdmin = environment.apiUrl + 'admin/chat/get-all-message';
  static RemoveUserInGroup = environment.apiUrl + 'admin/chat/remove-user-in-group';
}
