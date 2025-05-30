import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { employeWSresponse } from '../dto/employeWSresponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Client;
  private employees: employeWSresponse[] = [];

  constructor(private http: HttpClient) {}

  getAllemployeWSresponse(): Observable<employeWSresponse[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token tidak ditemukan');
      return new Observable<employeWSresponse[]>();
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<employeWSresponse[]>(
      `${environment.apiUrl}employee/getAllEmoloyeeNipName`,
      { headers }
    );
  }

  setEmployees(employees: employeWSresponse[]): void {
    this.employees = employees;
  }

  getEmployees(): employeWSresponse[] {
    return this.employees;
  }

  connect(onMessage: (msg: any) => void): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage!');
      return;
    }

    this.http
      .post<employeWSresponse>(
        `${environment.apiUrl}employee/getNipFromtoken`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .subscribe({
        next: (res: employeWSresponse) => {
          const nip = res.nip;
          if (!nip) {
            console.error('NIP tidak ditemukan dalam response');
            return;
          }
          this.initializeWebSocketConnection(nip, token, onMessage);
        },
        error: (err) => {
          console.error('Gagal mengambil NIP:', err);
        },
      });
  }

  private initializeWebSocketConnection(
    nip: number,
    token: string,
    onMessage: (msg: any) => void
  ) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${environment.apiUrl}ws`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log('[STOMP]', str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket connected');
        this.stompClient.subscribe(`/queue/messages/${nip}`, (message: IMessage) => {
          onMessage(JSON.parse(message.body));
        });
      },
      onStompError: (frame) => {
        console.error('Broker error:', frame.headers['message']);
        console.error('Details:', frame.body);
      },
    });

    this.stompClient.activate();
  }

  sendMessage(msg: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat/send',
        body: JSON.stringify(msg),
      });
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
      console.log('WebSocket disconnected');
    }
  }

  getCurrentUserNip(): number {
    return 20242831; // Placeholder
  }
}
