import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Import HttpClient untuk melakukan HTTP request
import { ResetPasswordService } from '../../core/service/ResetPasswordService';  // Import service

@Component({
  selector: 'app-form-resetpassword',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-resetpassword.component.html',
  styleUrls: ['./form-resetpassword.component.css']
})
export class FormResetpasswordComponent implements OnInit {
  userId: string | null = null;
  newPassword: string = '';
  confirmPassword: string = '';
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;
  debounceTimer: any;
  showPasswordMismatchError: boolean = false;
  tokenValid: boolean = false;  // Status untuk memeriksa validitas token
  errorMessage: string = '';  // Menyimpan pesan error jika token tidak valid
  isLoadingTokenCheck: boolean = true;  // Status loading untuk pengecekan token

  constructor(private route: ActivatedRoute, private resetPasswordService: ResetPasswordService) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('User ID:', this.userId);
  
    // const token = this.route.snapshot.queryParamMap.get('token');
    // console.log('Token from URL:', token);  // Verifikasi apakah token benar-benar ada
  
    if (this.userId) {
      this.checkTokenValidity(this.userId);
    } else {
      this.errorMessage = 'Token tidak ditemukan.';
      this.isLoadingTokenCheck = false;
    }
  }
  

  // Cek apakah token valid
  checkTokenValidity(token: string) {
    this.resetPasswordService.checkTokenValidity(token).subscribe(
      response => {
        console.log('Token Validity Response:', response);  // Verifikasi respons dari backend
        if (response.message === 'Silakan masukkan password baru') {
          this.tokenValid = true;
        } else {
          this.tokenValid = false;
          this.errorMessage = 'Token tidak valid atau kedaluwarsa';
        }
        this.isLoadingTokenCheck = false;
      },
      error => {
        this.tokenValid = false;
        this.errorMessage = 'Token tidak valid atau kedaluwarsa';
        this.isLoadingTokenCheck = false;
      }
    );
  }
  

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onPasswordInputChange() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.showPasswordMismatchError = this.newPassword !== this.confirmPassword;
    }, 500);
  }

  onResetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Password dan konfirmasi tidak cocok!');
      return;
    }

    const token = this.userId;
    if (token) {
      this.isLoading = true;
      this.resetPasswordService.resetPassword(token, this.newPassword).subscribe(
        response => {
          this.isLoading = false;
          alert('Password berhasil di-reset!');
        },
        error => {
          this.isLoading = false;
          alert('Gagal mengubah password!');
        }
      );
    }
  }
}
