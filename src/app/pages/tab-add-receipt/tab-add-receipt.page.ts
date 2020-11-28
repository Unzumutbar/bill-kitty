import { Component, OnInit } from '@angular/core';
import { Receipt, User } from '../../shared/models';

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
    await this.firebaseService.Receipt.add(receiptToAdd);

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
