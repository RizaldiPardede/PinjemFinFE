import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../core/service/WebsocketService';
import { ChatMessage } from '../../core/dto/chatmessagerequest'; // Impor tipe ChatMessage
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { employeWSresponse } from '../../core/dto/employeWSresponse';

@Component({
  selector: 'app-mini-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './mini-chat.component.html',
  styleUrls: ['./mini-chat.component.css']
})
export class MiniChatComponent implements OnInit {
  isOpen = true;
  currentUserNip: number = 0; // Ubah menjadi number
  receiverNip: number = 0;    // Ubah menjadi number
  receiverName = '';
  messageText = '';
  messages: ChatMessage[] = []; // Menggunakan tipe ChatMessage
  employeWSresponse: employeWSresponse[] = []; // Menyimpan daftar karyawan

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    // Ambil data karyawan dan inisialisasi koneksi WebSocket
    this.wsService.getAllemployeWSresponse().subscribe({
      next: (data: employeWSresponse[]) => {
        this.employeWSresponse = data; // Simpan data karyawan
        this.currentUserNip = this.wsService.getCurrentUserNip(); // Ambil NIP dari service
      },
      error: (err) => {
        console.error('Gagal mengambil data karyawan', err);
      }
    });

    // Inisialisasi koneksi WebSocket
    this.wsService.connect((msg: ChatMessage) => {
      this.messages.push(msg); // Menambahkan pesan yang diterima
    });
  }

  sendMessage() {
    if (!this.messageText.trim()) return;

    const msg: ChatMessage = {
      senderNip: this.currentUserNip,  // Pastikan senderNip adalah number
      receiverNip: this.receiverNip,  // Pastikan receiverNip adalah number
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

  getName(nip: number): string {
    const employee = this.employeWSresponse.find(emp => emp.nip === nip); // Pastikan perbandingan nip sesuai tipe
    return employee ? employee.nama : nip.toString(); // Menampilkan nama jika ditemukan, jika tidak tampilkan NIP
  }

  // Menangani pemilihan penerima pesan
  onReceiverChange(nip: number) {  // Pastikan nip yang dipilih adalah number
    this.receiverNip = nip;
    const receiver = this.employeWSresponse.find(emp => emp.nip === nip);
    this.receiverName = receiver ? receiver.nama : 'Pilih penerima'; // Update nama penerima
  }
}
