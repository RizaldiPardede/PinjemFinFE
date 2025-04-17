import { Routes } from '@angular/router';
import { LoginEmployeeComponent } from '../app/features/login-employee/login-employee.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DetailAkunMarketingComponent } from './features/detail-akun-marketing/detail-akun-marketing.component';
import { PengajuanMarketingComponent } from './features/pengajuan-marketing/pengajuan-marketing.component';
import { PengajuanBranchmanagerComponent } from './features/pengajuan-branchmanager/pengajuan-branchmanager.component';
import { PengajuanBackofficeComponent } from './features/pengajuan-backoffice/pengajuan-backoffice.component';
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
        path: '',
        redirectTo: 'detailakunmarketing',
        pathMatch: 'full'
      }
    ]
  }
];
