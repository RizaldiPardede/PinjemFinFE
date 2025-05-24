import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private baseUrl = `${environment.apiUrl}feature`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllFeatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getallfeature`, {
      headers: this.getAuthHeaders()
    });
  }
}
