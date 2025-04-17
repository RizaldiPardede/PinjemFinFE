import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { disburserequest } from '../dto/disburserequest';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employee';
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
    
    console.log(token)
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPengajuanEmployeeMarketing(): Observable<any> {
    if (!this.isBrowser) {
      return throwError(() => new Error('localStorage is not available in server environment'));
    }

    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/getPengajuanEmployeeMarketing`, { headers });
  }
  getPengajuanEmployeeBranchmanager(): Observable<any> {
    if (!this.isBrowser) {
      return throwError(() => new Error('localStorage is not available in server environment'));
    }

    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/getPengajuanEmployeeBranchmanager`, { headers });
  }

  getPengajuanEmployeeBackoffice(): Observable<any> {
    if (!this.isBrowser) {
      return throwError(() => new Error('localStorage is not available in server environment'));
    }

    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/getPengajuanEmployeeBackoffice`, { headers });
  }

  getProfileMarketing(): Observable<any> {
    if (!this.isBrowser) {
      return throwError(() => new Error('localStorage is not available in server environment'));
    }

    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/getProfileMarketing`, { headers });
  }

   // Method to recommend pengajuan with token in header
   recommendPengajuan(id_pengajuan: string): Observable<any> {
    const headers = this.getAuthHeaders();

    const url = `${this.apiUrl}/recomendMarketing`;  // Your API route for recommendation
    const body = { id_pengajuan };  // Request body containing the ID
    
    return this.http.post(url, body, { headers });  // Sending POST request with token in headers
  }

  AprovePengajuan(id_pengajuan: string): Observable<any> {
    const headers = this.getAuthHeaders();

    const url = `${this.apiUrl}/approveBranchManager`;  // Your API route for recommendation
    const body = { id_pengajuan };  // Request body containing the ID
    
    return this.http.post(url, body, { headers });  // Sending POST request with token in headers
  }

  DisbursePengajuan(id_pengajuan: string,disburse: disburserequest): Observable<any> {
    const headers = this.getAuthHeaders();

    const url = `${this.apiUrl}/disbursement`;
    const url2 = `http://localhost:8080/peminjaman/AddPeminjaman`;
    const body = { id_pengajuan }; // Your API route for recommendation
     // Request body containing the ID
     return this.http.post(url, body, { headers }).pipe(
      switchMap(() => this.http.post(url2, disburse, { headers }))
    );  // Sending POST request with token in headers
  }


  
}
