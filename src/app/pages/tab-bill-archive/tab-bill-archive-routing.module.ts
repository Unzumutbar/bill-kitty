import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TabBillArchivePage } from './tab-bill-archive.page';

const routes: Routes = [
  {
    path: '',
    component: TabBillArchivePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabBillArchivePageRoutingModule {}
