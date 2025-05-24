import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Modal } from 'bootstrap';
import { EmployeeService } from '../../core/service/EmployeeService';
import { disburserequest } from '../../core/dto/disburserequest';
@Component({
  selector: 'app-pengajuan-backoffice',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxDatatableModule],
  templateUrl: './pengajuan-backoffice.component.html',
  styleUrl: './pengajuan-backoffice.component.css'
})
export class PengajuanBackofficeComponent {
  pengajuanList: any[] = [];
  pengajuanRows: any[] = [];
  selectedPengajuan: any = null;
  modal: Modal | null = null;
  isBrowser: boolean;
  confirmModal: Modal | null = null;

  constructor(
    private employeeService: EmployeeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.employeeService.getPengajuanEmployeeBackoffice().subscribe({
        next: (data) => {
          this.pengajuanList = data;
          this.pengajuanRows = data.map((p: any) => ({
            nama: p.id_pengajuan?.id_user_customer?.users?.nama ?? 'Nama Tidak Ditemukan',
            jenisPlafon: p.id_pengajuan?.id_user_customer?.plafon?.jenis_plafon ?? 'Jenis Plafon Tidak Ditemukan',
            jumlahPlafon: p.id_pengajuan?.id_user_customer?.plafon?.jumlah_plafon ?? 'Jumlah Plafon Tidak Ditemukan',
            jumlahPengajuan: p.id_pengajuan?.amount ?? 'Jumlah Pengajuan Tidak Ditemukan',
            raw: p
          }));
        },
        error: (error) => {
          console.error('Terjadi kesalahan saat memuat data:', error);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      import('bootstrap').then(({ Modal }) => {
        const reviewModalEl = document.getElementById('reviewModal');
        if (reviewModalEl) {
          this.modal = new Modal(reviewModalEl);
        }
        const confirmModalEl = document.getElementById('confirmModal');
        if (confirmModalEl) {
          this.confirmModal = new Modal(confirmModalEl);  // Inisialisasi modal konfirmasi
        }
      }).catch(err => console.error('Error importing Bootstrap Modal:', err));
    }
  }

  openModal(pengajuan: any): void {
    this.selectedPengajuan = pengajuan;
    if (this.modal) {
      this.modal.show();
    }
  }

  recomendPengajuan(id_pengajuan: string): void {
    console.log('Tombol Recommend diklik, menunjukkan pop-up konfirmasi.');
    console.log('recomendPengajuan triggered with id:', id_pengajuan);
    // Cari pengajuan yang dipilih
    this.selectedPengajuan = this.pengajuanList.find(p => p.id_pengajuan.id_pengajuan === id_pengajuan);
  
    // Pastikan modal konfirmasi diinisialisasi
    if (this.confirmModal) {
      this.confirmModal.show(); // Tampilkan modal konfirmasi
    } else {
      console.error('Modal konfirmasi tidak diinisialisasi dengan benar.');
    }
  }

  
  confirmRecommendation(isConfirmed: boolean): void {
    if (isConfirmed && this.selectedPengajuan) {

      const dto: disburserequest = {
        amount: this.selectedPengajuan.id_pengajuan.amount,
        angsuran: this.selectedPengajuan.id_pengajuan.angsuran,
        tenor: this.selectedPengajuan.id_pengajuan.tenor,
        bunga: this.selectedPengajuan.id_pengajuan.bunga,
        total_payment: this.selectedPengajuan.id_pengajuan.total_payment,
        id_user_customer: this.selectedPengajuan.id_pengajuan.id_user_customer.id_user_customer
        
      };

      this.employeeService.DisbursePengajuan(this.selectedPengajuan.id_pengajuan.id_pengajuan,dto).subscribe({
        next: (response) => {
          console.log('Recommendation successful:', response);
          // ✅ Tutup modal konfirmasi
          if (this.confirmModal) {
            this.confirmModal.hide();
          }
          // ✅ Reload halaman
          window.location.reload();
        },
        error: (error) => {
          console.error('Error recommending pengajuan:', error);
          // Bisa tambahkan alert atau toast error di sini
        }
      });
    } else {
      if (this.confirmModal) {
        this.confirmModal.hide();
      }
    }
  }
}
