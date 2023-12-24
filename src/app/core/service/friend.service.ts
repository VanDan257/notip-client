import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AppRoutingApi } from 'src/app/app-routing-api';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  getListFriends() {
    return this.http.get(AppRoutingApi.GetListFriends);
  }

  getListFriendInvites() {
    return this.http.get(AppRoutingApi.GetListFriendInvites);
  }

  acceptInvite(recipientId: any){
    this.http.patch(AppRoutingApi.AcceptInviteFriend, recipientId);
  }

  blockUser(recipientId: any){
    this.http.patch(AppRoutingApi.BlockUser, recipientId)
  }

  removeBlockUser(recipientId: any){
    this.http.patch(AppRoutingApi.BlockUser, recipientId)
  }

}
