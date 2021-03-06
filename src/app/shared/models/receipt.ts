import { ReceiptPosition } from './receipt-position';
import { User } from './user';
import { defaultUsers } from '../lists';
import { formatDate } from '@angular/common';

export class Receipt {
    public Id: string;
    public TimeStamp: number;
    public User: User = null;
    public Description = '';
    public Amount = 0;
    public BillId: string;
    public Positions = new Array<ReceiptPosition>();

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
    public static Map(doc: any): Receipt {
        const receipt = new Receipt();
        receipt.Id = doc.id;
        receipt.TimeStamp = doc.data()['timestamp'];

        const userName = doc.data()['user'];
        receipt.User = defaultUsers.find(u => u.Name === userName);

        if (!receipt.User){
            receipt.User = new User();
            receipt.User.Name = userName;
            receipt.User.Icon = 'nutrition-outline';
        }

        receipt.Description = doc.data()['description'];
        receipt.Amount = doc.data()['amount'];
        receipt.BillId = doc.data()['billId'];
        return receipt;
    }
}
