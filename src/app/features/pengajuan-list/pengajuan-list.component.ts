import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/service/EmployeeService';
import { HasFeatureDirective } from '../shared/directives/has-feature.directive';

declare var bootstrap: any;
@Component({
  selector: 'app-pengajuan-list',
  standalone: true,
  imports: [CommonModule,HasFeatureDirective],
  templateUrl: './pengajuan-list.component.html',
  styleUrls: ['./pengajuan-list.component.css']
})
export class PengajuanListComponent implements OnInit {
  pengajuans: any[] = [];
  isLoading: boolean = true;
  selectedPengajuan: any = null;
  noteSebelumnya:any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getPengajuanEmployee().subscribe({
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
    const idPengajuan = this.selectedPengajuan?.id_pengajuan?.id_pengajuan;
      if (idPengajuan) {
        this.employeeService.getNote(idPengajuan).subscribe({
          next: (response) => {
            // Pastikan response berbentuk array, kalau tidak, sesuaikan parsing-nya
            this.noteSebelumnya = Array.isArray(response) ? response : [];
          },
          error: (error) => {
            console.error('Error saat ambil note sebelumnya:', error);
            this.noteSebelumnya = [];
          }
        });
      } else {
        console.warn('id_pengajuan tidak ditemukan pada pengajuan');
        this.noteSebelumnya = [];
      }

    // Bootstrap 5 modal show
    const modalElement = document.getElementById('detailModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
