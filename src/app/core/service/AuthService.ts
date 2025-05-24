import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth/loginEmployee`;

  constructor(private http: HttpClient) {}

  loginEmployee(nip: number, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nip, password });
  }
}