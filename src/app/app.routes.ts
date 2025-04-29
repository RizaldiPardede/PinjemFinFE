import { Routes } from '@angular/router';
import { LoginEmployeeComponent } from '../app/features/login-employee/login-employee.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DetailAkunMarketingComponent } from './features/detail-akun-marketing/detail-akun-marketing.component';
import { PengajuanMarketingComponent } from './features/pengajuan-marketing/pengajuan-marketing.component';
import { PengajuanBranchmanagerComponent } from './features/pengajuan-branchmanager/pengajuan-branchmanager.component';
import { PengajuanBackofficeComponent } from './features/pengajuan-backoffice/pengajuan-backoffice.component';
import { ManajemenBranchComponent } from './features/manajemen-branch/manajemen-branch.component';
import { ManajemenUsersemployeeComponent } from './features/manajemen-usersemployee/manajemen-usersemployee.component';
import {FormResetpasswordComponent} from './features/form-resetpassword/form-resetpassword.component';
import {ManajemenRoleComponent} from './features/manajemen-role/manajemen-role.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => LoginEmployeeComponent },

  {
    path: 'dashboard',
    loadComponent: () => DashboardComponent,
    children: [
      {
        path: 'detailakunmarketing',
        loadComponent: () => DetailAkunMarketingComponent
      },
      {
        path: 'pengajuanmarketing', // ⬅️ Tambahkan path baru
        loadComponent: () => PengajuanMarketingComponent
      },
      {
        path: 'pengajuanbranchmanager', // ⬅️ Tambahkan path baru
        loadComponent: () => PengajuanBranchmanagerComponent
      },{
        path: 'pengajuanbackoffice', // ⬅️ Tambahkan path baru
        loadComponent: () => PengajuanBackofficeComponent
      },
      {
        path: 'manajemenbranch', // ⬅️ Tambahkan path baru
        loadComponent: () => ManajemenBranchComponent
      },

      {
        path: 'manajemenuseremployee', // ⬅️ Tambahkan path baru
        loadComponent: () => ManajemenUsersemployeeComponent
      },
      {
        path: 'manajemenrole', // ⬅️ Tambahkan path baru
        loadComponent: () => ManajemenRoleComponent
      },
      {
        path: '',
        redirectTo: 'detailakunmarketing',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'resetpassword/:id',
    component: FormResetpasswordComponent
  }
];
