import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'meow',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'receipt',
        loadChildren: () => import('../pages/tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'archive',
        loadChildren: () => import('../pages/tab3/tab3.module').then(m => m.Tab3PageModule)
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
    path: 'bill-details',
    loadChildren: () => import('./bill-details/bill-details.module').then( m => m.BillDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'confirm-bill',
    loadChildren: () => import('./confirm-bill/confirm-bill.module').then( m => m.ConfirmBillPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
