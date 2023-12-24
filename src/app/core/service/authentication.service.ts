import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  get getToken(): string | null {
    return (
      localStorage.getItem(Constants.LOCAL_STORAGE_KEY.TOKEN)?.toString() ??
      null
    );
  }

  get currentUserValue(): any {
    let session = localStorage.getItem(Constants.LOCAL_STORAGE_KEY.SESSION);

    if (session == null || session == undefined) return null;
    return JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE_KEY.SESSION)?.toString() ??
        ''
    );
  }

  updateCurrentUser(currentUser: any){
    localStorage.setItem(Constants.LOCAL_STORAGE_KEY.SESSION, JSON.stringify(currentUser));
  }

  login(params: any) {
    return this.http.post(AppRoutingApi.Login, params).pipe(
      map((response: any) => {
        console.log(response['data']['token']);
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

  signUp(params: any) {
    return this.http.post(AppRoutingApi.SignUp, params);
  }
}
