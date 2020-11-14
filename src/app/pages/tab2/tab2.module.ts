import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { UpdaterecordComponent } from '../../components/updaterecord/updaterecord.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],

  entryComponents: [UpdaterecordComponent],
  declarations: [Tab2Page, UpdaterecordComponent]
})
export class Tab2PageModule {}
