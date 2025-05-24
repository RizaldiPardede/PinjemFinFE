import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../core/service/RoleService';
import { FeatureService } from '../../core/service/FeatureService';
import { RoleFeatureService } from '../../core/service/RoleFeatureService';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-manajemen-role',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manajemen-role.component.html',
  styleUrls: ['./manajemen-role.component.css']
})
export class ManajemenRoleComponent implements OnInit {

  roles: any[] = [];
  features: any[] = [];
  newRoleName: string = '';
  selectedRoleId: string = '';
  selectedFeatures: Set<string> = new Set();  // Set untuk menampung fitur yang dipilih
  roleFeatures: Set<string> = new Set();  // Set untuk menyimpan fitur yang sudah ter-attach ke role

  constructor(
    private roleService: RoleService,
    private featureService: FeatureService,
    private roleFeatureService: RoleFeatureService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadFeatures();
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error loading roles', err);
      }
    });
  }

  loadFeatures() {
    this.featureService.getAllFeatures().subscribe({
      next: (data) => {
        this.features = data;
      },
      error: (err) => {
        console.error('Error loading features', err);
      }
    });
  }

  loadFeaturesByRole(roleId: string) {
    console.log('Memanggil API untuk mendapatkan fitur berdasarkan role:', roleId);
    const requestBody = {
      id_role: roleId // ID role yang dikirim dalam body
    };

    this.roleFeatureService.getFeaturesByRole(requestBody).subscribe({
      next: (data) => {
        console.log('Fitur yang ter-attach:', data);
        this.roleFeatures = new Set(data);  // Menyimpan fitur yang sudah ter-attach ke role
        this.selectedFeatures.clear();  // Kosongkan selectedFeatures sebelumnya
        this.roleFeatures.forEach((featureId) => {
          this.selectedFeatures.add(featureId);  // Tandai fitur yang sudah ada
        });
      },
      error: (err) => {
        console.error('Error loading features by role', err);
      }
    });
  }

  onRoleSelect(roleId: string) {
    console.log('Role dipilih:', roleId); 
    this.selectedRoleId = roleId;
    this.loadFeaturesByRole(roleId); // Panggil API untuk load fitur yang sudah ter-attach
  }

  createRole() {
    if (this.newRoleName.trim() !== '') {
      this.roleService.createRole(this.newRoleName).subscribe({
        next: () => {
          alert('Role berhasil dibuat');
          this.newRoleName = '';
          this.loadRoles();
        },
        error: (err) => {
          console.error('Error creating role', err);
          alert('Gagal membuat role');
        }
      });
    }
  }

  deleteRole(roleId: string) {
    this.roleService.deleteRole(roleId).subscribe({
      next: (response) => {
        alert('Role berhasil dihapus');
        this.loadRoles(); // Reload daftar roles
      },
      error: (err) => {
        console.log('Error response:', err); // Log untuk memeriksa error
        if (err.error && err.error.message) {
          alert(err.error.message); // Menampilkan pesan error
        } else {
          alert('Terjadi kesalahan saat menghapus role'); // Pesan fallback
        }
      }
    });
  }

  toggleFeatureSelection(featureId: string) {
    if (this.selectedFeatures.has(featureId)) {
      this.selectedFeatures.delete(featureId);
    } else {
      this.selectedFeatures.add(featureId);
    }
  }

  attachFeatures() {
    if (!this.selectedRoleId) {
      alert('Pilih role terlebih dahulu');
      return;
    }

    // Mengambil array fitur yang dipilih
    const featureArray = Array.from(this.selectedFeatures);

    // Membuat array request untuk setiap feature yang dipilih
    const requestBody = {
      id_role: this.selectedRoleId,  // ID role yang dikirim
      featureIds: featureArray  // Mengirimkan semua fitur yang dipilih
    };

    // Mengirim request untuk attach fitur
    this.roleFeatureService.attachFeature(requestBody).subscribe({
      next: () => {
        alert('Fitur berhasil di-attach!');
      },
      error: (err) => {
        console.error('Error attaching features', err);
        alert('Gagal attach fitur!');
      }
    });
  }
}
