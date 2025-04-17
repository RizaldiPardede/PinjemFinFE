import { Component , OnInit} from '@angular/core';
import { EmployeeService  } from '../../core/service/EmployeeService';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-detail-akun-marketing',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './detail-akun-marketing.component.html',
  styleUrl: './detail-akun-marketing.component.css'
})
export class DetailAkunMarketingComponent implements OnInit {
  employee: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployeeProfile();
  }

  getEmployeeProfile(): void {
    this.employeeService.getProfileMarketing().subscribe({
      next: (data) => {
        this.employee = data;
        console.log('Data Profile:', this.employee);
      },
      error: (err) => {
        console.error('Gagal memuat profile:', err);
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

  
}
