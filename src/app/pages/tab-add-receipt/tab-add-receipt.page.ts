import { Component, OnInit } from '@angular/core';
import { Receipt, ReceiptPosition, User } from '../../shared/models';

import { FirebaseService } from '../../services/firebase.service';
import { NotificationService } from '../../services/notification.service';
import { defaultUsers } from '../../shared/lists';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tab-add-receipt',
  templateUrl: 'tab-add-receipt.page.html',
  styleUrls: ['tab-add-receipt.page.scss']
})
export class TabAddReceiptPage implements OnInit {
  public newReceipt: Receipt;
  public users: User[];

  private lastPositionUser: User;

  constructor(
    private notify: NotificationService,
    private firebaseService: FirebaseService,
  ) {}

  public ngOnInit(){
    this.users = defaultUsers;
    this.newReceipt = this.getDefaultReceipt();
    this.newReceipt.Date = this.getDateString(new Date());
  }

  public async addReceipt(receiptToAdd: Receipt){
    const spinner = await this.notify.showSpinner('Speichere Quittung');
    const addedReceipt = await this.firebaseService.Receipt.add(receiptToAdd);

    for (const position of receiptToAdd.Positions) {
      position.ReceiptId = addedReceipt.Id;
      await this.firebaseService.ReceiptPosition.add(position);
    }

    this.newReceipt = this.getDefaultReceipt();
    spinner.hide();
    await this.notify.showSuccess('Quittung erfolgreich hinzugefügt');
  }

  private getDefaultReceipt(): Receipt{
    const defaultReceipt = new Receipt();
    defaultReceipt.Date = this.getDateString(new Date());
    defaultReceipt.User = this.users[0];
    defaultReceipt.Description = '';
    defaultReceipt.BillId = '';
    defaultReceipt.Positions = [];

    if (this.newReceipt !== null && this.newReceipt !== undefined) {
      defaultReceipt.User = this.newReceipt.User;
      defaultReceipt.Description = this.newReceipt.Description;
    }

    return defaultReceipt;
  }

  public async addPosition(){
    const defaultPosition = new ReceiptPosition();
    defaultPosition.User = this.users[0];
    defaultPosition.Description = '';
    defaultPosition.Amount = 0;
    defaultPosition.TimeStamp = new Date().getTime();

    if (this.lastPositionUser !== null && this.lastPositionUser !== undefined) {
      defaultPosition.User = this.lastPositionUser;
    }

    this.newReceipt.Positions.push(defaultPosition);
  }

  public async deletePosition(positionToDelete: ReceiptPosition){
    const index = this.newReceipt.Positions.indexOf(positionToDelete, 0);
    if (index > -1) {
      this.newReceipt.Positions.splice(index, 1);
    }
  }

  private getDateString(date: Date): string {
    const format = 'yyyy-MM-ddTHH:mm:ss.000';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  get inputInvalid(): boolean {
    if (this.newReceipt.User === null || this.newReceipt.User === undefined) {
      return true;
    }

    if (this.newReceipt.Date === null || this.newReceipt.Date === undefined) {
      return true;
    }

    if (this.newReceipt.Amount === 0) {
      return true;
    }

    if (this.newReceipt.Positions.some(p => p.Amount === 0) ||
      this.newReceipt.Positions.reduce(
        (sum: number, b: ReceiptPosition) => sum + b.Amount, 0)
        > this.newReceipt.Amount) {
      return true;
    }

    return false;
  }

  get positionsEmpty(): boolean {
    return !(this.newReceipt && this.newReceipt.Positions.length > 0);
  }
}
