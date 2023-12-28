import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { ChatRoomManagementComponent } from './chat-room/chat-room-management/chat-room-management.component';
import { PipeHostFilePipe } from '../../../core/pipe/pipe-host-file.pipe';
import { ChatDatePipe } from '../../../core/pipe/chat-date.pipe';
import { PipeModule } from '../../../core/pipe/pipe.module';
import { InfoDetailChatRoomComponent } from './chat-room/info-detail-chat-room/info-detail-chat-room.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    DashboardComponent,
    ChatRoomManagementComponent,
    InfoDetailChatRoomComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxChartsModule,
    PipeModule,
    ToastrModule
  ],
})
export class HomeModule { }
