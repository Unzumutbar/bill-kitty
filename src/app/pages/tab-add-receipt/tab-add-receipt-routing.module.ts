import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TabAddReceiptPage } from './tab-add-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: TabAddReceiptPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabAddReceiptPageRoutingModule {}
