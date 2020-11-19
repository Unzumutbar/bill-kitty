import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';
import { IonicModule } from '@ionic/angular';
import { TabBillDashboardPage } from './tab-bill-dashboard.page';

describe('TabBillDashboardPage', () => {
  let component: TabBillDashboardPage;
  let fixture: ComponentFixture<TabBillDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabBillDashboardPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabBillDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
