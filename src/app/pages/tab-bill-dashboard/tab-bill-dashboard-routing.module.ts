import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TabBillDashboardPage } from './tab-bill-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: TabBillDashboardPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabBillDashboardPageRoutingModule {}
