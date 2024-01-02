import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChatRoomManagementComponent} from "./chat-room/chat-room-management/chat-room-management.component";
import {InfoDetailChatRoomComponent} from "./chat-room/info-detail-chat-room/info-detail-chat-room.component";
import {ClientManagementComponent} from "./client/client-management/client-management.component";
import {DetailInforClientComponent} from "./client/detail-infor-client/detail-infor-client.component";
import {StaffManagementComponent} from "./staff/staff-management/staff-management.component";
import {DetailInfoStaffComponent} from "./staff/detail-info-staff/detail-info-staff.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'phong-chat',
    children: [
      {
        path: 'quan-ly-phong-chat',
        component: ChatRoomManagementComponent
      },
      {
        path: 'chi-tiet-phong-chat/:id',
        component: InfoDetailChatRoomComponent
      },
    ]
  },
  {
    path: 'khach-hang',
    children: [
      {
        path: 'quan-ly-khach-hang',
        component: ClientManagementComponent
      },
      {
        path: 'thong-tin-khach-hang/:id',
        component: DetailInforClientComponent
      },
    ]
  },
  {
    path: 'nhan-vien',
    children: [
      {
        path: 'quan-ly-nhan-vien',
        component: StaffManagementComponent
      },
      {
        path: 'thong-tin-nhan-vien/:id',
        component: DetailInfoStaffComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
