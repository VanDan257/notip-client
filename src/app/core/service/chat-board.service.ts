import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class ChatBoardService {
  constructor(private http: HttpClient) {}

  getHistory() {
    return this.http.get(AppRoutingApi.GetChatHistory);
  }

  getChatBoardInfo(groupCode: string) {
    return this.http.get(AppRoutingApi.GetChatBoardInfo + '/' + groupCode);
  }

  searchChat(keySearch: string){
    return this.http.get(AppRoutingApi.SearchChat + '/' + keySearch);
  }

  addGroup(group: any) {
    return this.http.post(AppRoutingApi.AddGroup, group);
  }

  sendMessage(message: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(AppRoutingApi.SendMessage, message);
  }

  getMessageByGroup(chatId: any) {
    return this.http.get(AppRoutingApi.GetMessageByGroup + '/' + chatId);
  }

  getMessageByContact(contactCode: string) {
    return this.http.get(AppRoutingApi.GetMessageByContact + '/' + contactCode);
  }

  downloadFileAttachment(path: string) {
    return this.http.get(AppRoutingApi.DownloadFile + '?key=' + path, {
      responseType: 'blob',
    });
  }

  updateGroupAvatar(group: any) {
    return this.http.post(AppRoutingApi.UpdateGroupAvatar, group);
  }
}
