import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './home.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit{
  currentAdmin: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentAdmin = this.userService.currentAdmin;
  }
}
