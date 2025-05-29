export interface RoleDTO {
  id_role: string;
  nama_role: string;
}

export interface UserDTO {
  id_user: string;
  nama: string;
  email: string;
  password: string;
  role: RoleDTO;
  isActive: boolean;
}

export interface BranchDTO {
  id_branch: string;
  nama_branch: string;
  alamat_branch: string;
  latitude_branch: number;
  longitude_branch: number;
}

export interface CurrentEmployeeResponse {
  id_user_employee: string;
  users: UserDTO;
  nip: number;
  jabatan: string;
  branch: BranchDTO | null;
}
