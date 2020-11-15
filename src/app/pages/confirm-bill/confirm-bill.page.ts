import { Bill, CheckStatus, SplitBill } from '../../shared/models';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-confirm-bill',
  templateUrl: './confirm-bill.page.html',
  styleUrls: ['./confirm-bill.page.scss'],
})
export class ConfirmBillPage implements OnInit {
  public bill: Bill;
  public debtorBills: SplitBill[];
  public creditorBill: SplitBill;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController) {
    this.bill = navParams.data.bill;
  }

  public async ngOnInit() {
    this.debtorBills = this.bill.SplitBills.filter(sb => sb.OpenAmount < 0);
    this.creditorBill = this.bill.SplitBills.find(sb => sb.OpenAmount >= 0);
  }

  public onApprove() {
    this.closeModal(CheckStatus.Approve);
  }

  public onDismiss() {
    this.closeModal(CheckStatus.Dismiss);
  }
  public async closeModal(status: CheckStatus) {
    await this.modalController.dismiss(status);
  }
}
