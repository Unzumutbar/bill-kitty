import { DocumentChangeAction } from '@angular/fire/firestore';
import { User } from './user';
import { defaultUsers } from '../lists';
import { formatDate } from '@angular/common';

export class Record {
    public Id: string;
    public TimeStamp: number;
    public User: User = null;
    public Description = '';
    public Amount = 0;
    public BillId: string;

    get Icon(): string {
        if (this.User === null || this.User === undefined) {
            return;
        }

        return this.User.Icon;
    }

    set Date(value) {
        if (value === null || value === undefined) {
            return;
        }

        this.TimeStamp = new Date(value).getTime();
    }

    get Date(): string {
        if (this.TimeStamp === null || this.TimeStamp === undefined) {
            return '';
        }
        const format = 'yyyy-MM-ddTHH:mm:ss.000';
        const locale = 'en-US';
        return formatDate(new Date(this.TimeStamp), format, locale);
    }

    get DisplayDate(): string {
        if (this.Date === null || this.Date === undefined || this.Date === '') {
            return '';
        }

        const dateToDisplay = new Date(this.Date);
        const format = 'dd.MM.yyyy';
        const locale = 'en-US';
        return formatDate(dateToDisplay, format, locale);
    }

    // tslint:disable: no-string-literal
    public static Map(e: DocumentChangeAction<unknown>): Record {
        const record = new Record();
        record.Id = e.payload.doc.id;
        record.TimeStamp = e.payload.doc.data()['timestamp'];

        const userName = e.payload.doc.data()['user'];
        record.User = defaultUsers.find(u => u.Name === userName);
        if (!record.User){
            record.User = new User();
            record.User.Name = userName;
            record.User.Icon = 'nutrition-outline';
        }

        record.Description = e.payload.doc.data()['description'];
        record.Amount = e.payload.doc.data()['amount'];
        record.BillId = e.payload.doc.data()['billId'];
        return record;
    }
}
