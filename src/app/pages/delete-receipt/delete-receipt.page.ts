import { CheckStatus, Receipt } from '../../shared/models';
import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delete-receipt',
  templateUrl: './delete-receipt.page.html',
  styleUrls: ['./delete-receipt.page.scss'],
})
export class DeleteReceiptPage implements OnInit {
  @Input() public receipt: Receipt;
  constructor(private modalController: ModalController) { }

  public ngOnInit() {
    console.log(this.receipt);
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
