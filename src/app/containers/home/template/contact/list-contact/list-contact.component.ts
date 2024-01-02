import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css'],
})
export class ListContactComponent implements OnInit {
  @Output() onClick = new EventEmitter<number>();

  contacts: User[] = [];
  currentUser: any = {};
  itemIndexSelected: number = -1;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // this.getContact();
    this.currentUser = this.authService.currentUserValue;
  }

  openContact(index: number) {
    this.itemIndexSelected = index;
    this.onClick.emit(this.itemIndexSelected);
  }

  removeItem(obj: any) {
    this.contacts = this.contacts.filter((c) => c.name !== obj);
  }

  uniqByFilter() {
    this.contacts = this.contacts.filter(
      (value, index, array) =>
        index == array.findIndex((item) => item.name == value.name)
    );
  }
}
