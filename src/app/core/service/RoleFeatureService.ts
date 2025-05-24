import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoleFeatureService {

  private baseUrl = `${environment.apiUrl}rolefeature`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  attachFeature(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/attach`, body, {
      headers: this.getAuthHeaders()
    });
  }

  getFeaturesByRole(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getallrolefetures`, body, {
      headers: this.getAuthHeaders()
    });
  }
  
}
