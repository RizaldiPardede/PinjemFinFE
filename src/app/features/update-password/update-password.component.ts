import { Component } from '@angular/core';
import { EmployeeService } from '../../core/service/EmployeeService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService,private router: Router) {}

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  onChangePasswordSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      return;
    }

    this.isLoading = true;

    this.employeeService.ubahPassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: res => {
        alert('Password berhasil diubah');
        this.isLoading = false;
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        alert('Gagal ubah password: ' + (err.error?.message || err.message));
        this.isLoading = false;
      }
    });
  }
}
