// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../../../core/pipe/pipe.module';
import { InfoDetailChatRoomComponent } from './chat-room/info-detail-chat-room/info-detail-chat-room.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from "ngx-toastr";
import {HomeRoutingModule} from "./home-routing.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';


// pipe
import { PipeHostFilePipe } from '../../../core/pipe/pipe-host-file.pipe';
import { ChatDatePipe } from '../../../core/pipe/chat-date.pipe';

// component
import {DashboardComponent} from "./dashboard/dashboard.component";
import { ChatRoomManagementComponent } from './chat-room/chat-room-management/chat-room-management.component';
import { ClientManagementComponent } from './client/client-management/client-management.component';
import { DetailInforClientComponent } from './client/detail-infor-client/detail-infor-client.component';
import { StaffManagementComponent } from './staff/staff-management/staff-management.component';
import { DetailInfoStaffComponent } from './staff/detail-info-staff/detail-info-staff.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    DashboardComponent,
    ChatRoomManagementComponent,
    InfoDetailChatRoomComponent,
    ClientManagementComponent,
    DetailInforClientComponent,
    StaffManagementComponent,
    DetailInfoStaffComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxChartsModule,
    PipeModule,
    ToastrModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
})
export class HomeModule { }
