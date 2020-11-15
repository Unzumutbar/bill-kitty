import { Component, OnInit } from '@angular/core';
import { Receipt, User } from '../../shared/models';

import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from '../../services/notification.service';
import { defaultUsers } from '../../shared/lists';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public newReceipt: Receipt;
  public users: User[];

  constructor(
    private firestore: AngularFirestore,
    private notify: NotificationService
  ) {}

  public ngOnInit(){
    this.users = defaultUsers;
    this.newReceipt = this.getDefaultReceipt();
    this.newReceipt.Date = this.getDateString(new Date());
  }

  // tslint:disable: no-string-literal
  public async addReceipt(receiptToAdd: Receipt){
    const spinner = await this.notify.showSpinner('Speichere Quittung');
    const addreceipt = {};
    addreceipt['timestamp'] = new Date(receiptToAdd.Date).getTime();
    addreceipt['user'] = receiptToAdd.User.Name;
    addreceipt['description'] = receiptToAdd.Description;
    addreceipt['amount'] = receiptToAdd.Amount;
    addreceipt['billId'] = receiptToAdd.BillId;

    this.firestore.collection('/Receipts/').add(addreceipt).then(async () => {
      this.newReceipt = this.getDefaultReceipt();
      spinner.hide();
      await this.notify.showSuccess('Quittung erfolgreich hinzugefügt');
    });
  }

  private getDefaultReceipt(): Receipt{
    const defaultReceipt = new Receipt();
    defaultReceipt.Date = this.getDateString(new Date());
    defaultReceipt.User = this.users[0];
    defaultReceipt.Description = '';
    defaultReceipt.BillId = '';

    if (this.newReceipt !== null && this.newReceipt !== undefined) {
      defaultReceipt.User = this.newReceipt.User;
      defaultReceipt.Description = this.newReceipt.Description;
    }

    return defaultReceipt;
  }

  private getDateString(date: Date): string {
    const format = 'yyyy-MM-ddTHH:mm:ss.000';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  get InputInvalid(): boolean {
    return !((this.newReceipt.User !== null || this.newReceipt.User !== undefined) &&
      (this.newReceipt.Date !== null || this.newReceipt.Date !== undefined) &&
      this.newReceipt.Amount > 0);
  }
}
