import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmBillPage } from './confirm-bill.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmBillPageRoutingModule {}
