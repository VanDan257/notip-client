import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminRoutingApi} from '../admin-routing.api';
import {AppRoutingApi} from "../../app-routing-api";
import {map} from "rxjs/operators";
import {Constants} from "../../core/utils/constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginAdmin(params: any) {
    console.log(params);
    return this.http.post(AdminRoutingApi.LoginAdmin, params).pipe(
      map((response: any) => {
        localStorage.setItem(
          Constants.LOCAL_STORAGE_KEY.SESSION,
          JSON.stringify(response['data'])
        );
        localStorage.setItem(
          Constants.LOCAL_STORAGE_KEY.TOKEN,
          response['data']['token']
        );

        return response;
      })
    );
  }


  get currentAdmin(): any {
    let session = localStorage.getItem(Constants.LOCAL_STORAGE_KEY.SESSION);

    if (session == null || session == undefined) return null;
    return JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE_KEY.SESSION)?.toString() ??
      ''
    );
  }

  getAllClients() {
    return this.http.get(AdminRoutingApi.GetAllClients);
  }

  getAllAdmin() {
    return this.http.get(AdminRoutingApi.GetAllAdmins)
  }

  createAccountAdmin(user: any) {
    return this.http.post(AdminRoutingApi.CreateAccountAdmin, user)
  }

  deleteAdmin(userId: any) {
    console.log(userId);
    return this.http.delete(AdminRoutingApi.DeleteAdmin, userId)
  }
}
