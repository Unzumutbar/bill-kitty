import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';
import { IonicModule } from '@ionic/angular';
import { TabBillArchivePage } from './tab-bill-archive.page';

describe('TabBillArchivePage', () => {
  let component: TabBillArchivePage;
  let fixture: ComponentFixture<TabBillArchivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabBillArchivePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabBillArchivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
