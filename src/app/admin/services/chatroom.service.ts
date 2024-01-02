import { Injectable } from '@angular/core';
import {AdminRoutingApi} from "../admin-routing.api";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private http: HttpClient) { }

  getAllChatAdmin() {
    return this.http.get(AdminRoutingApi.GetAllChatAdmin);
  }

  getDetailChatAdmin(chatId: number) {
    return this.http.get(AdminRoutingApi.GetDetailChatAdmin + '/' + chatId);
  }

  getAllMessagesAdmin() {
    return this.http.get(AdminRoutingApi.GetAllMessagesAdmin);
  }

  removeMemberInGroup(userId: any){
    return this.http.post(AdminRoutingApi.RemoveUserInGroup, userId)
  }

}
