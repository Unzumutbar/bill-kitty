import { CheckStatus, Record, User } from '../../shared/models';
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
  @Input() public record: Record;
  public users: User[];

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
  ) { }

  public ngOnInit() {
    this.users = defaultUsers;
  }

  // tslint:disable: no-string-literal
  public updateRecord(){
    const updaterecord = {};
    updaterecord['user'] = this.record.User.Name,
    updaterecord['description'] = this.record.Description,
    updaterecord['amount'] = this.record.Amount,
    this.firestore.doc('/Records/' + this.record.Id).update(updaterecord).then(() => {
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
