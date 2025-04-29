import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../core/service/BranchService';
import { RoleService } from '../../core/service/RoleService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmployeeService } from '../../core/service/EmployeeService';
import { UserEmployeUsersRequest } from '../../core/dto/UserEmployeUsersRequest';

@Component({
  selector: 'app-manajemen-usersemployee',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './manajemen-usersemployee.component.html',
  styleUrls: ['./manajemen-usersemployee.component.css']
})
export class ManajemenUsersemployeeComponent implements OnInit {
  branches: any[] = [];
  roles: any[] = [];
  employees: any[] = [];
  searchTerm: string = ''; // Search term for filtering employees

  selectedBranchId!: string;
  selectedRoleId!: string;

  newEmployee: UserEmployeUsersRequest = {
    users: {
      nama: '',
      email: '',
      id_role: ''
    },
    nip: 0,
    jabatan: '',
    idbranch: ''
  };

  constructor(
    private branchService: BranchService,
    private roleService: RoleService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.branchService.getAllBranches().subscribe({
      next: (res) => (this.branches = res),
      error: (err) => console.error('Error fetching branches:', err)
    });

    this.roleService.getAllRoles().subscribe({
      next: (res) => (this.roles = res),
      error: (err) => console.error('Error fetching roles:', err)
    });

    this.employeeService.getAllEmployee().subscribe({
      next: (res) => (this.employees = res),
      error: (err) => console.error('Error fetching employees:', err)
    });
  }

  createEmployee() {
    this.newEmployee.users.id_role = this.selectedRoleId;
    this.newEmployee.idbranch = this.selectedBranchId;

    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (res) => {
        console.log('Employee created:', res);
        alert('Employee berhasil dibuat!');
        this.loadInitialData(); // refresh list
        this.resetForm(); // clear form
      },
      error: (err) => {
        console.error('Gagal membuat employee:', err);
        alert('Gagal membuat employee!');
      }
    });
  }

  resetForm() {
    this.newEmployee = {
      users: {
        nama: '',
        email: '',
        id_role: ''
      },
      nip: 0,
      jabatan: '',
      idbranch: ''
    };
    this.selectedBranchId = '';
    this.selectedRoleId = '';
  }

  // Filter employees based on search term
  filteredEmployees() {
    return this.employees.filter(emp => {
      const fullName = emp.users.nama.toLowerCase();
      const email = emp.users.email.toLowerCase();
      const role = emp.users.role.nama_role.toLowerCase();
      const jabatan = emp.jabatan.toLowerCase();

      return fullName.includes(this.searchTerm.toLowerCase()) ||
             email.includes(this.searchTerm.toLowerCase()) ||
             role.includes(this.searchTerm.toLowerCase()) ||
             jabatan.includes(this.searchTerm.toLowerCase());
    });
  }

  // Fungsi untuk reset password
  resetPassword(email: string) {
    this.employeeService.resetPassword(email).subscribe({
      next: (res) => {
        console.log('Password reset email sent:', res);
        alert('Email reset password telah dikirim!');
      },
      error: (err) => {
        console.error('Error sending reset password email:', err);
        alert('Gagal mengirim email reset password!');
      }
    });
  }
}
