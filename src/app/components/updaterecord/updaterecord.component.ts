import { Component, Input, OnInit } from '@angular/core';
import { Receipt, User } from '../../shared/models';

import { CheckStatus } from '../../shared/enums';
import { FirebaseService } from 'src/app/services/firebase.service';
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
    private modalController: ModalController,
    private firebaseService: FirebaseService
  ) { }

  public ngOnInit() {
    this.users = defaultUsers;
  }

  public async updateReceipt(){
    await this.firebaseService.Receipt.update(this.receipt);
    this.closeModal(CheckStatus.Approve);
  }

  public onDismiss() {
    this.closeModal(CheckStatus.Dismiss);
  }

  public async closeModal(status: CheckStatus) {
    await this.modalController.dismiss(status);
  }
}
