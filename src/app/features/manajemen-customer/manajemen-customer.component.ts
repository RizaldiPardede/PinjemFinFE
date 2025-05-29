import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeService } from '../../core/service/EmployeeService';
import { NgIf, NgFor } from '@angular/common';
import { HasFeatureDirective } from '../shared/directives/has-feature.directive';

@Component({
  selector: 'app-manajemen-customer',
  standalone: true,
  imports: [CommonModule, NgChartsModule, NgIf, NgFor,HasFeatureDirective],
  templateUrl: './manajemen-customer.component.html',
  styleUrls: ['./manajemen-customer.component.css']
})
export class ManajemenCustomerComponent implements OnInit {
  customers: any[] = [];

  plafonChartLabels: string[] = [];
  plafonChartData: number[] = [];

  topBranches: { nama_branch: string; count: number }[] = [];

  errorMessage: string | null = null;

  selectedCustomer: any = null; // Untuk modal detail customer

  public pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.employeeService.getAllCustomer().subscribe({
      next: (data) => {
        this.customers = data;
        this.errorMessage = null;

        this.initPieChart();
        this.calculateTopBranches();
      },
      error: (error) => {
        this.errorMessage = error.message || 'Gagal memuat data customer';
        this.customers = [];
      }
    });
  }

  initPieChart() {
    const countByPlafon: Record<string, number> = {};

    for (let customer of this.customers) {
      const jenis = customer.plafon?.jenis_plafon || 'Lainnya';
      countByPlafon[jenis] = (countByPlafon[jenis] || 0) + 1;
    }

    this.plafonChartLabels = Object.keys(countByPlafon);
    this.plafonChartData = Object.values(countByPlafon);
  }

  calculateTopBranches() {
    const branchMap: Record<string, { nama_branch: string; count: number }> = {};

    for (let customer of this.customers) {
      const id = customer.branch?.id_branch;
      const nama = customer.branch?.nama_branch;

      if (!id || !nama) continue;

      if (!branchMap[id]) {
        branchMap[id] = { nama_branch: nama, count: 0 };
      }
      branchMap[id].count++;
    }

    this.topBranches = Object.values(branchMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  openDetailModal(customer: any) {
    this.selectedCustomer = customer;
  }

  closeDetailModal() {
    this.selectedCustomer = null;
  }
}
