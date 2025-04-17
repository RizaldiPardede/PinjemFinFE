import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/loginEmployee';

  constructor(private http: HttpClient) {}

  loginEmployee(nip: number, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nip, password });
  }
}