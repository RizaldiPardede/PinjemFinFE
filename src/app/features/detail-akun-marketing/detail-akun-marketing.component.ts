import { Component , OnInit} from '@angular/core';
import { EmployeeService  } from '../../core/service/EmployeeService';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { ChatService  } from '../../core/component_service/ChatService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-akun-marketing',
  imports: [CommonModule, HttpClientModule,FormsModule  ],
  templateUrl: './detail-akun-marketing.component.html',
  styleUrl: './detail-akun-marketing.component.css'
})
export class DetailAkunMarketingComponent implements OnInit {
  employee: any;
  newPassword: string = '';
  nip: string = ''; // Menyimpan NIP

  constructor(
    private employeeService: EmployeeService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.getEmployeeProfile();
  }

  // Mengambil profile employee
  getEmployeeProfile(): void {
    this.employeeService.getProfileMarketing().subscribe({
      next: (data) => {
        this.employee = data;
        console.log('Data Profile:', this.employee);
        this.nip = this.employee?.nip; // Set nip dari data profile
      },
      error: (err) => {
        console.error('Gagal memuat profile:', err);
      }
    });
  }

  // Fungsi untuk update password
  onUpdatePassword(): void {
    console.log('NIP:', this.nip);
    console.log('New Password:', this.newPassword);
    this.employeeService.updatePassword(this.nip, this.newPassword).subscribe({
      next: (data) => {
        console.log('Password successfully updated:', data);
      },
      error: (err) => {
        console.error('Gagal update password:', err);
        // Cek detail error
        console.error('Error response body:', err.error); // Periksa detail error
      }
    });
  }

  openBranchLocation(): void {
    const lat = this.employee?.branch?.latitude_branch;
    const lng = this.employee?.branch?.longitude_branch;
    if (lat && lng) {
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, '_blank');
    }
  }

  isChatVisible = false;  // Variabel untuk mengontrol visibilitas chat

  // Fungsi untuk toggle chat visibility
  openChatBox() {
    this.isChatVisible = !this.isChatVisible;
    this.chatService.toggleChatVisibility(this.isChatVisible);
  }
  
}
