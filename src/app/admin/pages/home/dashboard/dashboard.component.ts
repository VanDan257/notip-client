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
  clients: any[]=[];
  messages: any[] = [];
  messageCharts: any[] = [];
  userUse: any[] = [];
  userTable: any[] = [];
  numberOfMessages: number | undefined;

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
    this.getAllMessagesAdmin();
    this.getTopClientsChat();
  }

  onSelect(event: any) {
    console.log(event);
  }

  getTopClientsChat() {
    this.userService.getAllClients().subscribe({
      next: (response: any) => {
        this.clients = response;

        let clientMap = new Map();
        for (let client of response) {
          clientMap.set(client.id, { ...client, messageCount: 0 });
        }
        // Lọc và thêm thuộc tính message vào user nếu có id phù hợp
        for (let message of this.userUse) {
          let userId = message.senderId;
          if (clientMap.has(userId)) {
            clientMap.get(userId).messageCount = message.messageCount;
          }
        }

        this.clients = Array.from(clientMap.values()).slice(0, 10);
        this.clients.sort((a, b) => {
          if(a.messageCount > b.messageCount) return -1;
          if(a.messageCount < b.messageCount) return 1;
          return 0;
        })
      }
    })
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

        // Đếm số lượng tin nhắn theo tháng
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

        // Đếm số lượng tin nhắn theo senderId
        let dataBySender = this.messages.reduce((acc, item) => {
          const senderId = item.senderId;

          if (!acc[senderId]) {
            acc[senderId] = { senderId: senderId, messageCount: 0 };
          }

          acc[senderId].messageCount++;

          return acc;
        }, {});

        this.userUse = Object.values(dataBySender);

        // Đếm số lượng tin đã nhắn trong 7 ngày qua
        // Lấy thời điểm hiện tại
        const currentDate = new Date();
        // Số lượng tin nhắn trong 7 ngày qua
        const messagesWithinLast7Days = this.messages.filter(item => {
          // Chuyển thời điểm tạo tin nhắn thành đối tượng Date
          const messageDate = new Date(item.createdAt);

          // Tính khoảng thời gian giữa thời điểm hiện tại và thời điểm tạo tin nhắn
          const timeDifference = currentDate.getTime() - messageDate.getTime();

          // Chuyển thời gian từ milliseconds sang ngày
          const daysDifference = timeDifference / (1000 * 3600 * 24);

          // Kiểm tra xem tin nhắn có được tạo trong vòng 7 ngày qua không
          return daysDifference <= 7 && daysDifference > 0;
        });

        // Số lượng tin nhắn trong 7 ngày qua
        this.numberOfMessages = messagesWithinLast7Days.length;
      },
      error: err =>{
        this.toastr.error('', err, {
          timeOut: 2000,
        });
      },
    })
  }
}
