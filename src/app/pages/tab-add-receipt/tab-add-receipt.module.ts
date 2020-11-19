import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TabAddReceiptPage } from './tab-add-receipt.page';
import { TabAddReceiptPageRoutingModule } from './tab-add-receipt-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabAddReceiptPageRoutingModule
  ],

  declarations: [TabAddReceiptPage]
})
export class TabAddReceiptPageModule {}
