import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmBillPageRoutingModule } from './confirm-bill-routing.module';

import { ConfirmBillPage } from './confirm-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmBillPageRoutingModule
  ],
  declarations: [ConfirmBillPage]
})
export class ConfirmBillPageModule {}
