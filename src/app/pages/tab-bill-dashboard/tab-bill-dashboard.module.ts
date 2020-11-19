import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabBillDashboardPage } from './tab-bill-dashboard.page';
import { TabBillDashboardPageRoutingModule } from './tab-bill-dashboard-routing.module';
import { UpdaterecordComponent } from '../../components/updaterecord/updaterecord.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabBillDashboardPageRoutingModule
  ],

  entryComponents: [UpdaterecordComponent],
  declarations: [TabBillDashboardPage, UpdaterecordComponent]
})
export class TabBillDashboardPageModule {}
