import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { GetAllDocumentRequest } from '../../core/dto/GetAllDocumentRequest';

export interface UserCustomerImage {
  id: string;
  userCustomer: any; // bisa dibuat interface lebih detail jika perlu
  imageType: string;
  imageUrl: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserCustomerImageService {
  private apiUrl = `${environment.apiUrl}pengajuan`; // sesuaikan path api

  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private getAuthHeaders(): HttpHeaders {
    let token = '';
    if (this.isBrowser) {
      token = localStorage.getItem('token') || '';
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getImageDocPengajuan(id_user_customer: string): Observable<UserCustomerImage[]> {
    if (!this.isBrowser) {
      return throwError(() => new Error('localStorage is not available in server environment'));
    }
    const headers = this.getAuthHeaders();
    const body: GetAllDocumentRequest = { id_user_customer };
    return this.http.post<UserCustomerImage[]>(`${this.apiUrl}/getImageDocPengajuan`, body, { headers });
  }
}
