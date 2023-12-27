import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminRoutingApi} from '../admin-routing.api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

}
