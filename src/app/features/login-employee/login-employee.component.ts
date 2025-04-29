import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/service/AuthService'; // path disesuaikan

@Component({
  selector: 'app-login-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.css'] // perbaikan di sini
})
export class LoginEmployeeComponent {
  showPassword = false;
  nip: number | null = null;
  password: string = '';
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // method to auth
  onSubmit(): void {
    if (this.nip && this.password) {
      this.isLoading = true;
      this.authService.loginEmployee(this.nip, this.password).subscribe({
        next: (res) => {
          console.log('Login berhasil', res);
          // Simpan token ke localStorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('features', JSON.stringify(res.features));
          // Menavigasi ke halaman dashboard setelah login berhasil
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login gagal', err);
          this.isLoading = false;
          alert('Login gagal, periksa kembali NIP dan Password');
        }
      });
    } else {
      alert('NIP dan Password harus diisi!');
    }
  }
}
