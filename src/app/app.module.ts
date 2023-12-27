import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment'
import { AppComponent } from './app.component';

import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './containers/login/login.component';
import { LogoutComponent } from './containers/logout/logout.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { CallDetailComponent } from './containers/home/template/call/call-detail/call-detail.component';
import { ListCallComponent } from './containers/home/template/call/list-call/list-call.component';
import { ContactDetailComponent } from './containers/home/template/contact/contact-detail/contact-detail.component';
import { ListContactComponent } from './containers/home/template/contact/list-contact/list-contact.component';
import { DefaultComponent } from './containers/home/template/default/default.component';
import { ListMessageComponent } from './containers/home/template/message/list-message/list-message.component';
import { NotificationDetailComponent } from './containers/home/template/notification/notification-detail/notification-detail.component';
import { ListNotificationComponent } from './containers/home/template/notification/list-notification/list-notification.component';
import { MessageDetailComponent } from './containers/home/template/message/message-detail/message-detail.component';
import { ListMessageSearchComponent } from './containers/home/template/message/list-message-search/list-message-search.component';

// pipe
import { PipeHostFilePipe } from './core/pipe/pipe-host-file.pipe';
import { ChatDatePipe } from './core/pipe/chat-date.pipe';
import { PipeModule } from './core/pipe/pipe.module';

import { AuthGuardService } from './auth/auth-guard.service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';
import { ButtonUploadComponent } from './containers/button-upload/button-upload.component';


const config: SocketIoConfig = { url: environment.chatHub, options: {} };

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        PageNotFoundComponent,
        CallDetailComponent,
        ListCallComponent,
        ContactDetailComponent,
        ListContactComponent,
        DefaultComponent,
        MessageDetailComponent,
        ListMessageComponent,
        NotificationDetailComponent,
        ListNotificationComponent,
        // ChatDatePipe,
        // PipeHostFilePipe,
        ButtonUploadComponent,
        ListMessageSearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxSpinnerModule,
        PipeModule,
        ToastrModule.forRoot(),
        SocketIoModule.forRoot(config),

    ],
    providers: [
        AuthGuardService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
