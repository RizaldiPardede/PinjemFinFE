import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../core/service/WebsocketService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mini-chat',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './mini-chat.component.html',
  styleUrls: ['./mini-chat.component.css']
})
export class MiniChatComponent implements OnInit {
  isOpen = true;
  currentUserNip = '';
  receiverNip = '20242831'; // Bisa kamu ganti dinamis
  receiverName = '';
  messageText = '';
  messages: any[] = [];

  employeeMap: Record<string, string> = {
    '20242831': 'Rizaldi Pardede'
  };

  constructor(
    private wsService: WebsocketService // Memanggil WebsocketService
  ) {}

  ngOnInit() {
    // Inisialisasi koneksi WebSocket
    this.wsService.connect((msg) => {
      this.messages.push(msg); // Menambahkan pesan yang diterima
    });
  }

  sendMessage() {
    if (!this.messageText.trim()) return;

    const msg = {
      senderNip: this.currentUserNip,
      receiverNip: this.receiverNip,
      content: this.messageText,
      timestamp: new Date()
    };

    this.wsService.sendMessage(msg); // Kirim pesan melalui WebSocket
    this.messages.push(msg); // Tambahkan pesan yang terkirim ke chat
    this.messageText = ''; // Reset input pesan
  }

  closeChat() {
    this.isOpen = false; // Menutup chat
  }

  getName(nip: string): string {
    return this.employeeMap[nip] || nip; // Menampilkan nama jika ada di map
  }
}
