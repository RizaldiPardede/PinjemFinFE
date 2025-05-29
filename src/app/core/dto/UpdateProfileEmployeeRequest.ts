export interface UpdateProfileEmployeeRequest {
  nip: number;
  nama: string;
  email: string;
  jabatan: string;
  id_branch: string; // UUID sebagai string
  id_role: string;   // UUID sebagai string
}