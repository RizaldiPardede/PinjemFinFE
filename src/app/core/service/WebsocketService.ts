import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import SockJS from 'sockjs-client'; // Pastikan ini diimpor dengan benar
import * as Stomp from 'stompjs'; // Impor stompjs
import { Observable } from 'rxjs';
import { employeWSresponse } from '../dto/employeWSresponse';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private stompClient: any; // Gunakan tipe yang sesuai dengan StompJS

  constructor(private http: HttpClient) {}

  connect(onMessage: (msg: any) => void) {
    const token = localStorage.getItem('token'); // ambil token dari localStorage
    if (!token) {
      console.error('Token not found in localStorage!');
      return;
    }

    // Panggil API untuk ambil NIP
    this.http.post<employeWSresponse>('http://localhost:8080/employee/getNipFromtoken', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        const nip = res.nip;
        const nama = res.nama;  // Menangani nama yang baru saja ditambahkan
        console.log('NIP:', nip, 'Nama:', nama);  // Menampilkan nip dan nama
        this.initializeWebSocketConnection(nip, token, onMessage);
      },
      error: (err) => {
        console.error('Gagal mengambil NIP:', err);
      }
    });
  }

  // Inisialisasi WebSocket setelah mendapat NIP
  private initializeWebSocketConnection(nip: number, token: string, onMessage: (msg: any) => void) {
    const socket = new SockJS('http://localhost:8080/ws'); // Gunakan SockJS untuk WebSocket
    this.stompClient = Stomp.over(socket); // Gunakan Stomp untuk membungkus SockJS
    
    this.stompClient.connect({ 'Authorization': `Bearer ${token}` }, (frame: any) => {
      console.log('Connected: ' + frame);
      console.log(`Subscribe ke: /queue/messages/${nip}`); 
      this.stompClient.subscribe(`/queue/messages/${nip}`, (message: any) => {
        onMessage(JSON.parse(message.body));
      });
    }, (error: any) => {
      console.error('WebSocket Error:', error);
    });
  }

  

  sendMessage(msg: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/chat/send', {}, JSON.stringify(msg)); // Kirim pesan melalui WebSocket
    } else {
      console.error('WebSocket is not connected.');
    }
  }
}
