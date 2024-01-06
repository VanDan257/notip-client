import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit{
  clients: any[] = [];

  pageSize = 10; // Số lượng mục trên mỗi trang
  pageNumber = 1;

  constructor(private userService: UserService, private toastr: ToastrService) {  }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.userService.getAllClients().subscribe({
      next: (response: any) => {
        this.clients = response;
        console.log(this.clients);
      }
    })
  }
}
