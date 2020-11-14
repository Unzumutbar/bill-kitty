import { DocumentChangeAction } from '@angular/fire/firestore';
import { Record } from './record';
import { SplitBill } from './split-bill';
import { User } from './user';
import { defaultUsers } from '../lists';
import { formatDate } from '@angular/common';

export class Bill {

    public Id: string;
    public TimeStamp: number;
    public RecordCount: number;
    public TotalAmount: number;
    public StartDate: Date;
    public EndDate: Date;

    constructor(){
        this.records = [];
        this.TotalAmount = 0;
        this.RecordCount = 0;
    }

    private records: Record[] = [];
    get Records(): Record[] {
        if (this.records === null || this.records === undefined || this.records.length <= 0) {
            return [];
        }

        return this.records;
    }

    private splitBills: SplitBill[] = [];
    get SplitBills(): SplitBill[] {
        if (this.splitBills === null || this.splitBills === undefined || this.splitBills.length <= 0) {
            return [];
        }

        return this.splitBills;
    }

    // tslint:disable: no-string-literal
    public static Map(e: DocumentChangeAction<unknown>): Bill {
        const bill = new Bill();
        const billDoc = e.payload.doc;

        bill.Id = billDoc.id;
        bill.TimeStamp = billDoc.data()['timestamp'];
        bill.RecordCount = billDoc.data()['recordCount'];
        bill.TotalAmount = billDoc.data()['totalamount'];
        bill.StartDate = new Date(billDoc.data()['startdate']);
        bill.EndDate = new Date(billDoc.data()['enddate']);

        return bill;
    }

    public Init(records: Record[]) {
        if (records === null || records === undefined || records.length <= 0) {
            return;
        }

        this.records = this.getRecordsSortedByDate(records);
        this.StartDate = new Date(this.records[0].TimeStamp);
        this.EndDate = new Date(this.records[this.records.length - 1].TimeStamp);
        this.RecordCount = this.records.length;
        this.splitBills = this.splitTheBillAndGetTotal(this.records);
    }

    private getRecordsSortedByDate(records: Record[]): Record[] {
        return records.sort((n1, n2) => {
            const firstDate = new Date(n1.Date);
            const secondDate = new Date(n2.Date);
            if (firstDate > secondDate) {
                return 1;
            }
            if (firstDate < secondDate) {
                return -1;
            }
            return 0;
        });
    }

    private splitTheBillAndGetTotal(records: Record[]): SplitBill[] {
        this.TotalAmount = 0;
        const splitBills: SplitBill[] = [];
        const users = this.getUser(records);
        for (const user of users) {
            splitBills.push(new SplitBill(user));
        }

        for (const record of records) {
            const splitAmount = record.Amount / splitBills.length;
            for (const split of splitBills) {
                split.SharedAmount += splitAmount;
                if (split.User === record.User) {
                    split.PayedAmount += record.Amount;
                }
            }
            this.TotalAmount += record.Amount;
        }
        return splitBills;
    }

    private getUser(records: Record[]): User[] {
        const users: User[] = [];
        for (const user of defaultUsers) {
            users.push(user);
        }

        for (const record of records) {
          if (!users.some(u => u === record.User)){
            users.push(record.User);
          }
        }

        return users;
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
}
