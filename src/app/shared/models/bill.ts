import { DocumentChangeAction } from '@angular/fire/firestore';
import { Receipt } from './receipt';
import { SplitBill } from './split-bill';
import { User } from './user';
import { defaultUsers } from '../lists';
import { formatDate } from '@angular/common';

export class Bill {

    public Id: string;
    public TimeStamp: number;
    public ReceiptCount: number;
    public TotalAmount: number;
    public StartDate: Date;
    public EndDate: Date;

    constructor(){
        this.receipts = [];
        this.TotalAmount = 0;
        this.ReceiptCount = 0;
    }

    private receipts: Receipt[] = [];
    get Receipts(): Receipt[] {
        if (this.receipts === null || this.receipts === undefined || this.receipts.length <= 0) {
            return [];
        }

        return this.receipts;
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
        bill.ReceiptCount = billDoc.data()['receiptCount'];
        bill.TotalAmount = billDoc.data()['totalamount'];
        bill.StartDate = new Date(billDoc.data()['startdate']);
        bill.EndDate = new Date(billDoc.data()['enddate']);

        return bill;
    }

    public Init(receipt: Receipt[]) {
        if (receipt === null || receipt === undefined || receipt.length <= 0) {
            return;
        }

        this.receipts = this.getReceiptsSortedByDate(receipt);
        this.StartDate = new Date(this.receipts[0].TimeStamp);
        this.EndDate = new Date(this.receipts[this.receipts.length - 1].TimeStamp);
        this.ReceiptCount = this.receipts.length;
        this.splitBills = this.splitTheBillAndGetTotal(this.receipts);
    }

    private getReceiptsSortedByDate(receipt: Receipt[]): Receipt[] {
        return receipt.sort((n1, n2) => {
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

    private splitTheBillAndGetTotal(receipts: Receipt[]): SplitBill[] {
        this.TotalAmount = 0;
        const splitBills: SplitBill[] = [];
        const users = this.getUser(receipts);
        for (const user of users) {
            splitBills.push(new SplitBill(user));
        }

        for (const receipt of receipts) {
            const splitAmount = receipt.Amount / splitBills.length;
            for (const split of splitBills) {
                split.SharedAmount += splitAmount;
                if (split.User === receipt.User) {
                    split.PayedAmount += receipt.Amount;
                }
            }
            this.TotalAmount += receipt.Amount;
        }
        return splitBills;
    }

    private getUser(receipts: Receipt[]): User[] {
        const users: User[] = [];
        for (const user of defaultUsers) {
            users.push(user);
        }

        for (const receipt of receipts) {
          if (!users.some(u => u === receipt.User)){
            users.push(receipt.User);
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
