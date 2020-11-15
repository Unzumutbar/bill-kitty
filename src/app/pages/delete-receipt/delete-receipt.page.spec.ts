import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteReceiptPage } from './delete-receipt.page';

describe('DeleteReceiptPage', () => {
  let component: DeleteReceiptPage;
  let fixture: ComponentFixture<DeleteReceiptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReceiptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
