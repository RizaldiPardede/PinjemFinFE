import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchResponse } from '../dto/BranchResponse';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private apiUrl = 'http://localhost:8080/branch'; // URL API backend

  constructor(private http: HttpClient) { }

  // Helper untuk membuat header dengan token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Mengambil semua data branch
  getAllBranches(): Observable<BranchResponse[]> {
    return this.http.get<BranchResponse[]>(`${this.apiUrl}/getAllBranch`, {
      headers: this.getAuthHeaders()
    });
  }

  // Mengambil branch berdasarkan ID
  getBranchById(id: string): Observable<BranchResponse> {
    return this.http.post<BranchResponse>(`${this.apiUrl}/getBranch`, 
      { id_branch: id }, 
      { headers: this.getAuthHeaders() }
    );
  }

  // Menambah branch baru
  addBranch(branch: BranchResponse): Observable<BranchResponse> {
    return this.http.post<BranchResponse>(`${this.apiUrl}/addBranch`, 
      branch, 
      { headers: this.getAuthHeaders() }
    );
  }

  // Mengupdate branch yang ada
  updateBranch(id: string, branch: BranchResponse): Observable<BranchResponse> {
    return this.http.patch<BranchResponse>(`${this.apiUrl}/updateBranch/${id}`, 
      branch, 
      { headers: this.getAuthHeaders() }
    );
  }

  // Menghapus branch berdasarkan ID
  deleteBranch(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteBranch/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
