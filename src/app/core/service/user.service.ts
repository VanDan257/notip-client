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

  updateProfile(user: User) {
    return this.http.put(AppRoutingApi.UpdateProfile, user);
  }

  getContact() {
    return this.http.get(AppRoutingApi.GetContact);
  }

  searchContact(keySearch: string) {
    return this.http.get(AppRoutingApi.SearchContact + '/' + keySearch);
  }

  addContact(contact: User) {
    return this.http.post(AppRoutingApi.AddContact, contact);
  }
}
