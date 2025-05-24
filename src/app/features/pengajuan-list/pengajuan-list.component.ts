import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/service/EmployeeService';
declare var bootstrap: any;
@Component({
  selector: 'app-pengajuan-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pengajuan-list.component.html',
  styleUrls: ['./pengajuan-list.component.css']
})
export class PengajuanListComponent implements OnInit {
  pengajuans: any[] = [];
  isLoading: boolean = true;
  selectedPengajuan: any = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getPengajuanEmployeeMarketing().subscribe({
      next: (data) => {
        this.pengajuans = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Gagal mengambil data pengajuan:', error);
        this.isLoading = false;
      }
    });
  }

  openDetailModal(pengajuan: any): void {
    this.selectedPengajuan = pengajuan;

    // Bootstrap 5 modal show
    const modalElement = document.getElementById('detailModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
