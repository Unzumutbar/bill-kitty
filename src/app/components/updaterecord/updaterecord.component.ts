import { CheckStatus, Receipt, User } from '../../shared/models';
import { Component, Input, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { defaultUsers } from '../../shared/lists';

@Component({
  selector: 'app-updaterecord',
  templateUrl: './updaterecord.component.html',
  styleUrls: ['./updaterecord.component.scss'],
})
export class UpdaterecordComponent implements OnInit {
  @Input() public receipt: Receipt;
  public users: User[];

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
  ) { }

  public ngOnInit() {
    this.users = defaultUsers;
  }

  // tslint:disable: no-string-literal
  public updateReceipt(){
    const updateReceipt = {};
    updateReceipt['user'] = this.receipt.User.Name,
    updateReceipt['description'] = this.receipt.Description,
    updateReceipt['amount'] = this.receipt.Amount,
    this.firestore.doc('/Receipts/' + this.receipt.Id).update(updateReceipt).then(() => {
      this.closeModal(CheckStatus.Approve);
    });
  }

  public onDismiss() {
    this.closeModal(CheckStatus.Dismiss);
  }

  public async closeModal(status: CheckStatus) {
    await this.modalController.dismiss(status);
  }
}
