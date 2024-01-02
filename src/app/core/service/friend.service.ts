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

  searchUserFromInvitedFriendPage(keySearch: string){
    return this.http.get(AppRoutingApi.SearchUserFromInvitedFriendPage + '/' + keySearch);
  }

  sendInvite(recipientId: any){
    return this.http.post(AppRoutingApi.SendInviteFriend, {recipientId: recipientId});
  }

  acceptInvite(senderId: number){
    return this.http.patch(AppRoutingApi.AcceptInviteFriend, {senderId: senderId});
  }

  blockUser(recipientId: any){
    return this.http.patch(AppRoutingApi.BlockUser, recipientId)
  }

  removeBlockUser(recipientId: any){
    return this.http.patch(AppRoutingApi.BlockUser, recipientId)
  }

}
