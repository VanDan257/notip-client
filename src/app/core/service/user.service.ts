import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(AppRoutingApi.GetProfile);
  }

  updateProfile(userProfile: User) {
    return this.http.post(AppRoutingApi.UpdateProfile, userProfile);
  }

  updateAvatar(file: any){
    return this.http.post(AppRoutingApi.UpdateAvatar, file);
  }

  searchContact(keySearch: string) {
    return this.http.get(AppRoutingApi.SearchContact + '/' + keySearch);
  }

  addContact(contact: any) {
    return this.http.post(AppRoutingApi.AddContactIntoGroup, contact);
  }
}
