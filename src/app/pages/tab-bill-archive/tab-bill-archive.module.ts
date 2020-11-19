import { CommonModule, CurrencyPipe } from '@angular/common';

import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabBillArchivePage } from './tab-bill-archive.page';
import { TabBillArchivePageRoutingModule } from './tab-bill-archive-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TabBillArchivePage }]),
    TabBillArchivePageRoutingModule,
  ],
  declarations: [TabBillArchivePage]
})
export class TabBillArchivePageModule {}
