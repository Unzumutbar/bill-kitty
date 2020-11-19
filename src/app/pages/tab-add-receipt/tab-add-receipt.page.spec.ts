import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';
import { IonicModule } from '@ionic/angular';
import { TabAddReceiptPage } from './tab-add-receipt.page';

describe('TabAddReceiptPage', () => {
  let component: TabAddReceiptPage;
  let fixture: ComponentFixture<TabAddReceiptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabAddReceiptPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabAddReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
