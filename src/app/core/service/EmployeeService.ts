import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { disburserequest } from '../dto/disburserequest';
import { switchMap } from 'rxjs/operators';
import { UserEmployeUsersRequest } from '../dto/UserEmployeUsersRequest';
import { UpdateProfileEmployeeRequest } from '../dto/UpdateProfileEmployeeRequest';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}employee`;
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
  getAllEmployee(): Observable<any> {
    if (!this.isBrowser) {
      return throwError(() => new Error('localStorage is not available in server environment'));
    }

    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/getallEmployee`, { headers });
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
    return this.http.get<any>(`${this.apiUrl}/getProfileEmployee`, { headers });
  }

   // Method to recommend pengajuan with token in header
   recommendPengajuan(id_pengajuan: string,note: string): Observable<any> {
    const headers = this.getAuthHeaders();

    const url = `${this.apiUrl}/recomendMarketing`;  // Your API route for recommendation
    const body = { id_pengajuan ,note };  // Request body containing the ID
    
    return this.http.post(url, body, { headers });  // Sending POST request with token in headers
  }

  AprovePengajuan(id_pengajuan: string,note: string): Observable<any> {
    const headers = this.getAuthHeaders();

    const url = `${this.apiUrl}/approveBranchManager`;  // Your API route for recommendation
    const body = { id_pengajuan,note };  // Request body containing the ID
    
    return this.http.post(url, body, { headers });  // Sending POST request with token in headers
  }

  // DisbursePengajuan(id_pengajuan: string,disburse: disburserequest): Observable<any> {
  //   const headers = this.getAuthHeaders();

  //   const url = `${this.apiUrl}/disbursement`;
  //   const url2 = `${environment.apiUrl}peminjaman/AddPeminjaman`;
  //   const body = { id_pengajuan }; // Your API route for recommendation
  //    // Request body containing the ID
  //    return this.http.post(url, body, { headers }).pipe(
  //     switchMap(() => this.http.post(url2, disburse, { headers }))
  //   );  // Sending POST request with token in headers
  // }

  DisbursePengajuan(id_pengajuan: string,note: string): Observable<any> {
    const headers = this.getAuthHeaders();

    const url = `${this.apiUrl}/disbursement`;
    const body = { id_pengajuan,note };  // Request body containing the ID
    
    return this.http.post(url, body, { headers }); 
  }


  createEmployee(payload: UserEmployeUsersRequest): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/createAkunEmplooyee`, payload, { headers });
  }
  

  // Fungsi untuk melakukan reset password
  resetPassword(email: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${environment.apiUrl}auth/forgot-password`, { email },{ headers });
  }

  updatePassword(nip: string, newPassword: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { nip, newPassword };
  
    return this.http.put(`${this.apiUrl}/updatePassword`, body, { headers });
  }

  //code baru
  getPengajuanEmployee(): Observable<any> {
  if (!this.isBrowser) {
    return throwError(() => new Error('localStorage is not available in server environment'));
  }

  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrl}/getPengajuanEmployee`, { headers });
}

ubahPassword(request: { oldPassword: string, newPassword: string }): Observable<any> {
  const headers = this.getAuthHeaders();

  return this.http.post(`${this.apiUrl}/ubahPassword`, request, { headers });
}

getAllCustomer(): Observable<any> {
  if (!this.isBrowser) {
    return throwError(() => new Error('localStorage is not available in server environment'));
  }

  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrl}/getAllCustomer`, { headers });
}

getNote(id_pengajuan: string): Observable<any> {
  if (!this.isBrowser) {
    return throwError(() => new Error('localStorage is not available in server environment'));
  }

  const headers = this.getAuthHeaders();
  const body = { id_pengajuan };

  return this.http.post<any>(`${this.apiUrl}/getNote`, body, { headers });
}

  rejectPengajuan(id_pengajuan: string,note: string): Observable<any> {
      const headers = this.getAuthHeaders();

      const url = `${this.apiUrl}/reject`;
      const body = { id_pengajuan,note };  // Request body containing the ID
      
      return this.http.post(url, body, { headers }); 
    }

  updateProfile(request: UpdateProfileEmployeeRequest): Observable<any> {
  return this.http.put(
    `${this.apiUrl}/updateProfile`,
    request,
    { headers: this.getAuthHeaders() }
  );
}
  
}
