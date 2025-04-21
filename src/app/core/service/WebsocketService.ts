import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Observable } from 'rxjs';
import { employeWSresponse } from '../dto/employeWSresponse';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private stompClient: any;
  private employees: employeWSresponse[] = []; // Menyimpan data karyawan

  constructor(private http: HttpClient) {}

  // Method untuk mengambil semua karyawan
  getAllemployeWSresponse(): Observable<employeWSresponse[]> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Token tidak ditemukan');
      return new Observable<employeWSresponse[]>(); // Mengembalikan Observable kosong
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<employeWSresponse[]>('http://localhost:8080/employee/getAllEmoloyeeNipName', { headers });
  }

  // Method untuk menyimpan karyawan
  setEmployees(employees: employeWSresponse[]): void {
    this.employees = employees;
  }

  // Method untuk mendapatkan karyawan yang telah disimpan
  getEmployees(): employeWSresponse[] {
    return this.employees;
  }

  connect(onMessage: (msg: any) => void) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage!');
      return;
    }

    // Panggil API untuk ambil NIP
    this.http.post<employeWSresponse>('http://localhost:8080/employee/getNipFromtoken', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: employeWSresponse) => {
        const nip = res.nip;
        this.initializeWebSocketConnection(nip, token, onMessage);
      },
      error: (err) => {
        console.error('Gagal mengambil NIP:', err);
      }
    });
  }

  private initializeWebSocketConnection(nip: number, token: string, onMessage: (msg: any) => void) {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({ 'Authorization': `Bearer ${token}` }, (frame: any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe(`/queue/messages/${nip}`, (message: any) => {
        onMessage(JSON.parse(message.body));
      });
    }, (error: any) => {
      console.error('WebSocket Error:', error);
    });
  }

  sendMessage(msg: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/chat/send', {}, JSON.stringify(msg));
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  getCurrentUserNip(): number {
    // Method to get current user NIP from localStorage or another service
    return 20242831; // Example, replace with actual logic
  }
}
