import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'meow',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/tab-bill-dashboard/tab-bill-dashboard.module').then(m => m.TabBillDashboardPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'receipt',
        loadChildren: () => import('../pages/tab-add-receipt/tab-add-receipt.module').then(m => m.TabAddReceiptPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'archive',
        loadChildren: () => import('../pages/tab-bill-archive/tab-bill-archive.module').then(m => m.TabBillArchivePageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        redirectTo: '/meow/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/meow/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'bill',
    loadChildren: () => import('./bill-details/bill-details.module').then( m => m.BillDetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'confirm-bill',
    loadChildren: () => import('./confirm-bill/confirm-bill.module').then( m => m.ConfirmBillPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'delete-receipt',
    loadChildren: () => import('./delete-receipt/delete-receipt.module').then( m => m.DeleteReceiptPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
