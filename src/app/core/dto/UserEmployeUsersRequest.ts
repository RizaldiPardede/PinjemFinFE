export interface UserEmployeUsersRequest {
    users: {
      email: string;
      nama: string;
      id_role: string;
    };
    nip: number;
    jabatan: string;
    idbranch: string;
  }