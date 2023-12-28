import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChatRoomManagementComponent} from "./chat-room/chat-room-management/chat-room-management.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'quan-ly-phong-chat',
    component: ChatRoomManagementComponent
  },
  {
    path: 'chi-tiet-phong-chat/:id',
    component: ChatRoomManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
