import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../core/service/BranchService';
import { RoleService } from '../../core/service/RoleService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmployeeService } from '../../core/service/EmployeeService';
import { UserEmployeUsersRequest } from '../../core/dto/UserEmployeUsersRequest';
import { UpdateProfileEmployeeRequest } from '../../core/dto/UpdateProfileEmployeeRequest';
import { CurrentEmployeeResponse} from '../../core/dto/CurrentEmployeeResponse';
import { HasFeatureDirective } from '../shared/directives/has-feature.directive';

@Component({
  selector: 'app-manajemen-usersemployee',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule,HasFeatureDirective],
  templateUrl: './manajemen-usersemployee.component.html',
  styleUrls: ['./manajemen-usersemployee.component.css'],
})
export class ManajemenUsersemployeeComponent implements OnInit {
  branches: any[] = [];
  roles: any[] = [];
  employees: any[] = [];
  searchTerm: string = '';

  selectedBranchId!: string;
  selectedRoleId!: string;

  isEditMode = false;

  // currentEmployee dipakai baik untuk create atau edit
  currentEmployee: UserEmployeUsersRequest = this.emptyEmployee();

  currentEmployeeEdit :CurrentEmployeeResponse = {
  id_user_employee: '',
  users: {
    id_user: '',
    nama: '',
    email: '',
    password: '',
    role: {
      id_role: '',
      nama_role: ''
    },
    isActive: true
  },
  nip: 0,
  jabatan: '',
  branch: null
}

  constructor(
    private branchService: BranchService,
    private roleService: RoleService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  emptyEmployee(): UserEmployeUsersRequest {
    return {
      users: {
        nama: '',
        email: '',
        id_role: '',
      },
      nip: 0,
      jabatan: '',
      idbranch: '',
    };
  }

  loadInitialData() {
    this.branchService.getAllBranches().subscribe({
      next: (res) => (this.branches = res),
      error: (err) => console.error('Error fetching branches:', err),
    });

    this.roleService.getAllRoles().subscribe({
      next: (res) => (this.roles = res),
      error: (err) => console.error('Error fetching roles:', err),
    });

    this.employeeService.getAllEmployee().subscribe({
      next: (res) => (this.employees = res),
      error: (err) => console.error('Error fetching employees:', err),
    });
  }

  submitForm() {
  const request: UpdateProfileEmployeeRequest = {
    nip: this.currentEmployee.nip,     // ⛔ tidak diambil dari form karena tidak boleh diubah
    nama: this.currentEmployee.users.nama,
    email: this.currentEmployee.users.email,
    jabatan: this.currentEmployee.jabatan,
    id_branch: this.selectedBranchId,
    id_role: this.selectedRoleId,
  };

  if (this.isEditMode) {
    this.employeeService.updateProfile(request).subscribe({
      next: () => {
        alert('Employee berhasil diperbarui!');
        this.loadInitialData();
        this.resetForm();
      },
      error: (err) => {
        console.error('Gagal memperbarui employee:', err);
        alert('Gagal memperbarui employee!');
      },
    });
  } else {
    // Create new employee
    this.employeeService.createEmployee(this.currentEmployee).subscribe({
      next: (res) => {
        alert('Employee berhasil dibuat!');
        this.loadInitialData();
        this.resetForm();
      },
      error: (err) => {
        console.error('Gagal membuat employee:', err);
        alert('Gagal membuat employee!');
      },
    });
  }
}

  openEditForm(employee: CurrentEmployeeResponse) {
  this.isEditMode = true;
  this.currentEmployeeEdit = JSON.parse(JSON.stringify(employee)); // clone aman

  this.selectedBranchId = this.currentEmployeeEdit.branch?.id_branch ?? '';
  this.selectedRoleId = this.currentEmployeeEdit.users?.role.id_role ?? '';

  // Mapping currentEmployee dari currentEmployeeEdit supaya data form siap submit
  this.currentEmployee = {
    nip: this.currentEmployeeEdit.nip,
    jabatan: this.currentEmployeeEdit.jabatan,
    idbranch: this.selectedBranchId,
    users: {
      nama: this.currentEmployeeEdit.users.nama,
      email: this.currentEmployeeEdit.users.email,
      id_role: this.selectedRoleId,
    }
  };
}

  cancelEdit() {
    this.resetForm();
    this.isEditMode = false;
  }

  resetForm() {
    this.currentEmployee = this.emptyEmployee();
    this.selectedBranchId = '';
    this.selectedRoleId = '';
    this.isEditMode = false;
  }

  filteredEmployees() {
    return this.employees.filter((emp) => {
      const term = this.searchTerm.toLowerCase();
      return (
        emp.users.nama.toLowerCase().includes(term) ||
        emp.users.email.toLowerCase().includes(term) ||
        emp.users.role.nama_role.toLowerCase().includes(term) ||
        emp.jabatan.toLowerCase().includes(term)
      );
    });
  }

  resetPassword(email: string) {
    this.employeeService.resetPassword(email).subscribe({
      next: (res) => {
        alert('Email reset password telah dikirim!');
      },
      error: (err) => {
        alert('Gagal mengirim email reset password!');
      },
    });
  }
}
