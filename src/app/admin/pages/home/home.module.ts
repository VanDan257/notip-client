import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { ChatRoomManagementComponent } from './chat-room-management/chat-room-management.component';
import { PipeHostFilePipe } from '../../../core/pipe/pipe-host-file.pipe';
import { ChatDatePipe } from '../../../core/pipe/chat-date.pipe';
import { PipeModule } from '../../../core/pipe/pipe.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ChatRoomManagementComponent,
    // PipeHostFilePipe,
    // ChatDatePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PipeModule
  ],
})
export class HomeModule { }
