// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../../../core/pipe/pipe.module';
import { InfoDetailChatRoomComponent } from './chat-room/info-detail-chat-room/info-detail-chat-room.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from "ngx-toastr";
import {HomeRoutingModule} from "./home-routing.module";

// component
import {DashboardComponent} from "./dashboard/dashboard.component";
import { ChatRoomManagementComponent } from './chat-room/chat-room-management/chat-room-management.component';

// pipe
import { PipeHostFilePipe } from '../../../core/pipe/pipe-host-file.pipe';
import { ChatDatePipe } from '../../../core/pipe/chat-date.pipe';

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
    ToastrModule,
  ],
})
export class HomeModule { }
