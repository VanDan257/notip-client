import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import Chart from 'chart.js/auto';
import {ChatroomService} from "../../../services/chatroom.service";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chats: any[]=[];
  dataChat: number[] = [];
  clients: any[]=[];
  messages: any[] = [];
  messageCharts: any[] = [];

  @ViewChild('myChart') myChart!: ElementRef;

  //config chart;
  view: [number, number] = [660, 300];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  xAxisLabel = 'Tháng';
  yAxisLabel = 'Số lượng tin đã nhắn';
  showLegend = true;

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor(private chatRoomService: ChatroomService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllChatRoomAdmin();
    this.getAllClient();
    this.getAllMessagesAdmin();
  }

  onSelect(event: any) {
    console.log(event);
  }

  getAllClient(){

  }

  getAllChatRoomAdmin(){
    this.chatRoomService.getAllChatAdmin().subscribe({
      next: (response: any) => {
        this.chats = response;
      }
    })
  }
  getAllMessagesAdmin() {
    this.chatRoomService.getAllMessagesAdmin().subscribe({
      next: (response: any) => {
        this.messages = response;
        let data = this.messages.reduce((acc, item) => {
          const date = new Date(item.createdAt);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Tạo chuỗi tháng-năm

          if (!acc[monthYear]) {
            acc[monthYear] = { name: monthYear, value: 0,  realDate: item.createdAt}; // Khởi tạo đối tượng mới nếu chưa tồn tại
          }

          acc[monthYear].value++; // Tăng số lượng bản ghi

          return acc;
        }, {});

        this.messageCharts = Object.values(data);
        this.messageCharts.sort((a, b) => {
          if (a.realDate < b.realDate) return -1;
          if (a.realDate > b.realDate) return 1;
          return 0;
        });
      },
      error: err =>{
        this.toastr.error('', err, {
          timeOut: 2000,
        });
      },
    })
  }
}
