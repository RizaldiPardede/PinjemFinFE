import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private baseUrl = 'http://localhost:8080/feature';

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
