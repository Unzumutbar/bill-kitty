import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmBillPage } from './confirm-bill.page';

describe('ConfirmBillPage', () => {
  let component: ConfirmBillPage;
  let fixture: ComponentFixture<ConfirmBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
