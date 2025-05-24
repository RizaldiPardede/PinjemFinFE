import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Plafon } from '../../core/dto/plafon.model'; // sesuaikan pathnya

@Injectable({
  providedIn: 'root'
})
export class PlafonService {
  private apiUrl = `${environment.apiUrl}plafon`;
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

  getAllPlafon(): Observable<Plafon[]> {
    if (!this.isBrowser) {
      return throwError(() => new Error('localStorage is not available in server environment'));
    }

    const headers = this.getAuthHeaders();
    return this.http.get<Plafon[]>(`${this.apiUrl}/getAllPlafon`, { headers });
  }

  createPlafon(plafon: Plafon): Observable<Plafon> {
    const headers = this.getAuthHeaders();
    return this.http.post<Plafon>(`${this.apiUrl}/createPlafon`, plafon, { headers });
  }

  updatePlafon(id: string, plafon: Plafon): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, plafon, { headers });
  }

  deletePlafon(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
