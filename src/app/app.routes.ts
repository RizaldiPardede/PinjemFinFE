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
import {PengajuanListComponent} from './features/pengajuan-list/pengajuan-list.component';
import {UpdatePasswordComponent} from './features/update-password/update-password.component';
import {ManajemenCustomerComponent} from './features/manajemen-customer/manajemen-customer.component';
import {ManajemenPlafonComponent} from './features/manajemen-plafon/manajemen-plafon.component';
import {SassLandingOneComponent} from './features/sass-landing-one/sass-landing-one.component';
import { featureGuard } from './guards/feature.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
  { path: 'login', loadComponent: () => LoginEmployeeComponent },
  { path: 'updatepassword', loadComponent: () => UpdatePasswordComponent },
  { path: 'landingpage', loadComponent: () => SassLandingOneComponent },
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
        loadComponent: () => PengajuanMarketingComponent,
        // canActivate: [featureGuard],
        // data: { requiredFeature: 'feature_getIdUserCustomer' }
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
        path: 'pengajuanlist', // ⬅️ Tambahkan path baru
        loadComponent: () => PengajuanListComponent
      },
      {path: 'manajemencustomer', 
        loadComponent: () => ManajemenCustomerComponent },

      {path: 'manajemenplafon', 
        loadComponent: () => ManajemenPlafonComponent },

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
