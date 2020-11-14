import { Component, OnInit } from '@angular/core';
import { Record, User } from '../../shared/models';

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
  public newRecord: Record;
  public users: User[];

  constructor(
    private firestore: AngularFirestore,
    private notify: NotificationService
  ) {}

  public ngOnInit(){
    this.users = defaultUsers;
    this.newRecord = this.getDefaultRecord();
    this.newRecord.Date = this.getDateString(new Date());
  }

  // tslint:disable: no-string-literal
  public async addRecord(recordToAdd: Record){
    const spinner = await this.notify.showSpinner('Speichere Quittung');
    const addrecord = {};
    addrecord['timestamp'] = new Date(recordToAdd.Date).getTime();
    addrecord['user'] = recordToAdd.User.Name;
    addrecord['description'] = recordToAdd.Description;
    addrecord['amount'] = recordToAdd.Amount;
    addrecord['billId'] = recordToAdd.BillId;

    this.firestore.collection('/Records/').add(addrecord).then(async () => {
      this.newRecord = this.getDefaultRecord();
      spinner.hide();
      await this.notify.showSuccess('Quittung erfolgreich hinzugefügt');
    });
  }

  private getDefaultRecord(): Record{
    const defaultRecord = new Record();
    defaultRecord.Date = this.getDateString(new Date());
    defaultRecord.User = this.users[0];
    defaultRecord.Description = '';
    defaultRecord.BillId = '';

    if (this.newRecord !== null && this.newRecord !== undefined) {
      defaultRecord.User = this.newRecord.User;
      defaultRecord.Description = this.newRecord.Description;
    }

    return defaultRecord;
  }

  private getDateString(date: Date): string {
    const format = 'yyyy-MM-ddTHH:mm:ss.000';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  get InputInvalid(): boolean {
    return !((this.newRecord.User !== null || this.newRecord.User !== undefined) &&
      (this.newRecord.Date !== null || this.newRecord.Date !== undefined) &&
      this.newRecord.Amount > 0);
  }
}
