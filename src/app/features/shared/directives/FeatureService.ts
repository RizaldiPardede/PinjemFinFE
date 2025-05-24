import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private features: string[] = [];

  constructor() {
    this.loadFeatures();
  }

  // Memuat fitur dari localStorage
  private loadFeatures(): void {
    const stored = localStorage.getItem('features');
    if (stored) {
      try {
        this.features = JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing features from localStorage', error);
        this.features = []; // Inisialisasi dengan array kosong jika terjadi error
      }
    }
  }

  // Mengambil fitur yang tersimpan secara asinkron
  getFeatures(): Observable<string[]> {
    return of(this.features);  // Mengembalikan Observable untuk fitur
  }

  // Mengecek apakah fitur tertentu ada pada list fitur
  hasFeature(feature: string): Observable<boolean> {
    return of(this.features.includes(feature));  // Mengembalikan Observable<boolean>
  }

  // Mengecek apakah user memiliki semua fitur dalam array
  hasFeatures(features: string[]): Observable<boolean> {
    const hasAllFeatures = features.every(feature => this.features.includes(feature));
    return of(hasAllFeatures); // Mengembalikan Observable<boolean> untuk seluruh fitur
  }

  // Menyimpan fitur ke localStorage
  saveFeatures(features: string[]): void {
    this.features = features;
    localStorage.setItem('features', JSON.stringify(features));  // Menyimpan ke localStorage
  }
}
