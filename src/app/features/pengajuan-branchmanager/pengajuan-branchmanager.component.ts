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
import { UserCustomerImageService } from '../../core/service/UserCustomerImageService';
import { HasFeatureDirective } from '../shared/directives/has-feature.directive';

import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pengajuan-branchmanager',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxDatatableModule, HasFeatureDirective, FormsModule],
  templateUrl: './pengajuan-branchmanager.component.html',
  styleUrl: './pengajuan-branchmanager.component.css'
})
export class PengajuanBranchmanagerComponent {
  pengajuanList: any[] = [];
    pengajuanRows: any[] = [];
    selectedPengajuan: any = null;
  
    modal: Modal | null = null;
    confirmModal: Modal | null = null;
    confirmRejectModal: Modal | null = null;
    isBrowser: boolean;
    currentSlide: number = 1;
  
    dokumenList: any[] = [];
    noteBaru: string = '';
    noteSebelumnya:any[] = [];
    previewImageUrl: string = '';
    profileDoc: any;
    
  
    constructor(
      private employeeService: EmployeeService,
      
      private userCustomerImageService:UserCustomerImageService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(platformId);
    }
  
    ngOnInit(): void {
      if (this.isBrowser) {
        this.loadPengajuanMarketing();
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
            this.confirmModal = new Modal(confirmModalEl);
          }

          const confirmRejectModalEl = document.getElementById('confirmRejectModal');
          if (confirmRejectModalEl) {
          this.confirmRejectModal = new Modal(confirmRejectModalEl);
      }
        }).catch(err => console.error('Error importing Bootstrap Modal:', err));
      }
    }
  
    private loadPengajuanMarketing(): void {
      this.employeeService.getPengajuanEmployeeBranchmanager().subscribe({
        next: (data) => {
          this.pengajuanList = data;
          this.pengajuanRows = data.map((p: any) => ({
            nama: p?.id_pengajuan?.id_user_customer?.users?.nama ?? 'Nama Tidak Ditemukan',
            jenisPlafon: p?.id_pengajuan?.id_user_customer?.plafon?.jenis_plafon ?? 'Jenis Plafon Tidak Ditemukan',
            jumlahPlafon: p?.id_pengajuan?.id_user_customer?.plafon?.jumlah_plafon ?? 'Jumlah Plafon Tidak Ditemukan',
            jumlahPengajuan: p?.id_pengajuan?.amount ?? 'Jumlah Pengajuan Tidak Ditemukan',
            raw: p
          }));
        },
        error: (error) => {
          console.error('Terjadi kesalahan saat memuat data:', error);
        }
      });
  
      
    }
  
    openModal(pengajuan: any): void {
      this.selectedPengajuan = pengajuan;
      this.currentSlide = 1;
  
      
      this.noteBaru = '';
      this.noteSebelumnya = pengajuan?.noteSebelumnya ?? '';
  
      const idPengajuan = pengajuan?.id_pengajuan?.id_pengajuan;
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
      // Panggil service untuk ambil dokumen list berdasarkan pengajuan
      const userCustomerId = pengajuan?.id_pengajuan?.id_user_customer?.id_user_customer;
      console.log('Mengambil dokumen untuk userCustomerId:', userCustomerId);
  
      if (userCustomerId) {
        this.userCustomerImageService.getImageDocPengajuan(userCustomerId).subscribe(response => {
          this.dokumenList = response.map((doc: any) => ({
            imageType: doc.imageType,
            imageUrl: doc.imageUrl
          }));
          this.profileDoc = this.dokumenList.find(d => d.imageType === 'profile');
          this.showModal();
        }, error => {
          console.error('Error saat ambil dokumen:', error);
        });
      } else {
        console.error('UserCustomerId tidak ditemukan pada pengajuan');
      }
    }
  
    private showModal(): void {
      if (this.modal) {
        this.modal.show();
      } else {
        console.warn('Modal belum diinisialisasi');
      }
    }
  
    recomendPengajuan(id_pengajuan: string): void {
      console.log('Tombol Recommend diklik, menunjukkan pop-up konfirmasi.');
      console.log('recomendPengajuan triggered with id:', id_pengajuan);
  
      this.selectedPengajuan = this.pengajuanList.find(p => p?.id_pengajuan?.id_pengajuan === id_pengajuan);
  
      if (!this.selectedPengajuan) {
        console.error('Pengajuan dengan ID tersebut tidak ditemukan.');
        return;
      }
  
      this.showConfirmModal();
    }
  
    private showConfirmModal(): void {
      if (this.confirmModal) {
        this.confirmModal.show();
      } else {
        console.error('Modal konfirmasi tidak diinisialisasi dengan benar.');
      }
    }
  
    // confirmRecommendation(isConfirmed: boolean): void {
    //   if (isConfirmed && this.selectedPengajuan) {
    //     const id = this.selectedPengajuan?.id_pengajuan?.id_pengajuan;
    //     this.employeeService.AprovePengajuan(id,this.noteBaru).subscribe({
    //       next: (response) => {
    //         console.log('Recommendation successful:', response);
    //         this.hideConfirmModal();
    //         this.loadPengajuanMarketing();
    //       },
    //       error: (error) => {
    //         console.error('Error recommending pengajuan:', error);
    //       }
    //     });
    //   } else {
    //     this.hideConfirmModal();
    //   }
    // }
    confirmRecommendation(isConfirmed: boolean): void {
      if (isConfirmed && this.selectedPengajuan) {
        const id = this.selectedPengajuan?.id_pengajuan?.id_pengajuan;

        this.employeeService.AprovePengajuan(id, this.noteBaru).subscribe({
          next: () => {
            Swal.fire({
              title: '✅ Sukses',
              text: 'Pengajuan berhasil dicairkan.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.hideConfirmModal();
              this.loadPengajuanMarketing();
            });
          },
          error: (error) => {
            switch (error.status) {
              case 403:
                Swal.fire('⚠️ Akses Ditolak', 'Anda tidak memiliki akses untuk pengajuan ini.', 'warning');
                break;

              case 500:
                Swal.fire('❌ Error Server', 'Terjadi kesalahan server saat mencairkan pengajuan.', 'error');
                break;

              default:
                const message = error?.error?.message || 'Terjadi kesalahan saat mencairkan pengajuan.';
                Swal.fire('❌ Error', message, 'error');
                break;
            }
            console.error('❌ Error mencairkan pengajuan:', error);
          }
        });
      } else {
        this.hideConfirmModal();
      }
    }



    tolakPengajuan(id_pengajuan: string): void {
      console.log('Tombol Tolak diklik, menampilkan konfirmasi tolak.');
      this.selectedPengajuan = this.pengajuanList.find(p => p?.id_pengajuan?.id_pengajuan === id_pengajuan);

      if (!this.selectedPengajuan) {
        console.error('Pengajuan tidak ditemukan.');
        return;
      }

      if (this.confirmRejectModal) {
        this.confirmRejectModal.show();
      }
    }

    // confirmRejection(isConfirmed: boolean): void {
    //   if (isConfirmed && this.selectedPengajuan) {
    //     const id = this.selectedPengajuan?.id_pengajuan?.id_pengajuan;

    //     this.employeeService.rejectPengajuan(id, this.noteBaru).subscribe({
    //       next: (response) => {
    //         console.log('Penolakan berhasil:', response);
    //         this.confirmRejectModal?.hide();
    //         this.modal?.hide();
    //         this.loadPengajuanMarketing();
    //       },
    //       error: (error) => {
    //         console.error('Gagal menolak pengajuan:', error);
    //       }
    //     });
    //   } else {
    //     this.confirmRejectModal?.hide();
    //   }
    // }
    confirmRejection(isConfirmed: boolean): void {
      if (isConfirmed && this.selectedPengajuan) {
        const id = this.selectedPengajuan?.id_pengajuan?.id_pengajuan;

        this.employeeService.rejectPengajuan(id, this.noteBaru).subscribe({
          next: () => {
            Swal.fire({
              title: '✅ Sukses',
              text: 'Pengajuan berhasil ditolak',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.confirmRejectModal?.hide();
              this.modal?.hide();
              this.loadPengajuanMarketing();
            });
          },
          error: (error) => {
            switch (error.status) {
              case 403:
                Swal.fire('⚠️ Akses Ditolak', 'Anda tidak memiliki akses untuk pengajuan ini.', 'warning');
                break;

              case 500:
                Swal.fire('❌ Error Server', 'Terjadi kesalahan server.', 'error');
                break;

              default:
                const message = error?.error?.message || 'Terjadi kesalahan saat menolak pengajuan.';
                Swal.fire('❌ Error', message, 'error');
                break;
            }
          }
        });
      } else {
        this.confirmRejectModal?.hide();
      }
    }

  
    private hideConfirmModal(): void {
      if (this.confirmModal) {
        this.confirmModal.hide();
      }
    }
  
    openPreview(imageUrl: string) {
    this.previewImageUrl = imageUrl;
  
    // Tampilkan modal dengan Bootstrap JS
    const modalElement = document.getElementById('imagePreviewModal');
    if (modalElement) {
      // @ts-ignore
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
