import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { PlafonService } from '../../core/service/PlafonService';
import { Plafon } from '../../core/dto/plafon.model';

@Component({
  selector: 'app-manajemen-plafon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manajemen-plafon.component.html',
  styleUrl: './manajemen-plafon.component.css'
})
export class ManajemenPlafonComponent implements OnInit {
  plafonForm!: FormGroup;
  plafonList: Plafon[] = [];
  isEdit = false;
  editingId: string | null = null;

  constructor(private fb: FormBuilder, private plafonService: PlafonService) {}

  ngOnInit(): void {
    this.plafonForm = this.fb.group({
      jenis_plafon: ['', Validators.required],
      jumlah_plafon: [0, [Validators.required, Validators.min(0)]],
      bunga: [0, [Validators.required, Validators.min(0)]],
    });

    this.getAllPlafon();
  }

  getAllPlafon(): void {
    this.plafonService.getAllPlafon().subscribe({
      next: data => (this.plafonList = data),
      error: err => console.error('Gagal mengambil data plafon:', err),
    });
  }

  onSubmit(): void {
    if (this.plafonForm.invalid) {
      this.plafonForm.markAllAsTouched();
      return;
    }

    const requestData: Plafon = this.plafonForm.value;

    if (this.isEdit && this.editingId) {
      this.plafonService.updatePlafon(this.editingId, requestData).subscribe({
        next: () => {
          this.resetForm();
          this.getAllPlafon();
        },
        error: err => console.error('Gagal update plafon:', err),
      });
    } else {
      this.plafonService.createPlafon(requestData).subscribe({
        next: () => {
          this.resetForm();
          this.getAllPlafon();
        },
        error: err => console.error('Gagal tambah plafon:', err),
      });
    }
  }

  onEdit(plafon: Plafon): void {
    this.plafonForm.patchValue({
      jenis_plafon: plafon.jenis_plafon,
      jumlah_plafon: plafon.jumlah_plafon,
      bunga: plafon.bunga,
    });
    this.isEdit = true;
    this.editingId = plafon.id_plafon ?? null;
  }

  onDelete(id: string): void {
    if (confirm('Yakin ingin menghapus plafon ini?')) {
      this.plafonService
        .deletePlafon(id)
        .pipe(
          catchError(error => {
            console.error('Gagal menghapus:', error);
            return of(null);
          })
        )
        .subscribe(() => {
          this.getAllPlafon();
        });
    }
  }

  resetForm(): void {
    this.plafonForm.reset({
      jenis_plafon: '',
      jumlah_plafon: 0,
      bunga: 0,
    });
    this.isEdit = false;
    this.editingId = null;
  }

  getPlafonImage(jenis: string): string {
    switch (jenis.toLowerCase()) {
      case 'bronze':
        return 'assets/image/card_bronze.png';
      case 'silver':
        return 'assets/image/card_silver.png';
      case 'gold':
        return 'assets/image/card_gold.png';
      case 'platinum':
        return 'assets/image/card_platinum.png';
      default:
        return 'assets/image/card_default.png';
    }
  }
}
