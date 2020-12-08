import { Component, Input, OnInit } from '@angular/core';
import { Receipt, ReceiptPosition, User } from '../../shared/models';

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
  private deletedPositions: ReceiptPosition[];

  constructor(
    private modalController: ModalController,
    private firebaseService: FirebaseService
  ) { }

  public ngOnInit() {
    this.users = defaultUsers;
    this.deletedPositions = [];
  }

  public async updateReceipt(){
    await this.firebaseService.Receipt.update(this.receipt, this.deletedPositions);
    this.closeModal(CheckStatus.Approve);
  }

  public onDismiss() {
    this.closeModal(CheckStatus.Dismiss);
  }

  public async closeModal(status: CheckStatus) {
    await this.modalController.dismiss(status);
  }

  public async addPosition(){
    const defaultPosition = new ReceiptPosition();
    defaultPosition.ReceiptId = this.receipt.Id;
    defaultPosition.User = this.users[0];
    defaultPosition.Description = '';
    defaultPosition.Amount = 0;
    defaultPosition.TimeStamp = new Date().getTime();

    this.receipt.Positions.push(defaultPosition);
  }

  public async deletePosition(positionToDelete: ReceiptPosition){
    const index = this.receipt.Positions.indexOf(positionToDelete, 0);
    if (index > -1) {
      if (positionToDelete.Id) {
        this.deletedPositions.push(positionToDelete);
      }

      this.receipt.Positions.splice(index, 1);
    }
  }
}
