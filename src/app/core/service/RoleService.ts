// http://localhost:8080/roles/getallRoles
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class RoleService {


    private baseUrl = `${environment.apiUrl}roles`;
  
    constructor(private http: HttpClient) {}
    

    // Helper untuk membuat header dengan token
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
    getAllRoles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/getallRoles`, {
        headers: this.getAuthHeaders()
      });
    }

    createRole(roleName: string): Observable<any> {
      const body = { nama_role: roleName };
      return this.http.post(`${this.baseUrl}/create`, body, {
        headers: this.getAuthHeaders()
      });
    }
  
    deleteRole(roleId: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete/${roleId}`, {
        headers: this.getAuthHeaders()
      }).pipe(
        catchError(this.handleError)  // Menangani error yang datang
      );
    }

    // Fungsi untuk menangani error
  private handleError(error: any): Observable<never> {
  console.error('Full error:', error); // Logging lengkap
  return throwError(() => error); // ⬅️ Lempar ulang error asli dari backend
}
  }