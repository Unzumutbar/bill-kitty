import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteReceiptPage } from './delete-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteReceiptPageRoutingModule {}
