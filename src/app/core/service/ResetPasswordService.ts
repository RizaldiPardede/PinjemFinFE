import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private apiUrl = 'http://localhost:8080/auth/reset-password';

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
  // Memeriksa token validitas
  checkTokenValidity(token: string): Observable<any> {
    const headers = this.getAuthHeaders();
    
    return this.http.get<any>(`${this.apiUrl}?token=${token}`,{headers});
  }

  // Melakukan reset password
  resetPassword(token: string, newPassword: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = {
      token: token,
      new_password: newPassword
    };

    return this.http.post<any>(this.apiUrl, body,{headers});
  }
}
