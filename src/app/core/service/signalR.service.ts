import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(private http: HttpClient) {}

  public hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    //   this.hubConnection = new signalR.HubConnectionBuilder()
    //     .withUrl(environment.chatHub, {
    //       skipNegotiation: true,
    //       transport: signalR.HttpTransportType.WebSockets,
    //     })
    //     .build();
    //
    //   let http = this.http;
    //
    //   this.hubConnection
    //     .start()
    //     .then(() => {
    //       console.log('Hub connection started');
    //       this.hubConnection
    //         .invoke('getConnectionId')
    //         .then(function (connectionId) {
    //           http
    //             .post(
    //               AppRoutingApi.PostHubConnection,
    //               {},
    //               {
    //                 params: {
    //                   key: connectionId,
    //                 },
    //               }
    //             )
    //             .subscribe({
    //               complete: () => console.log('connectionId: ', connectionId),
    //               error: (error) => console.log('error: ', error),
    //               next: (res) => console.log('next: ', res),
    //             });
    //         });
    //     })
    //     .catch((err) => console.log('Error while starting connection: ' + err));
    // };
  }
}
