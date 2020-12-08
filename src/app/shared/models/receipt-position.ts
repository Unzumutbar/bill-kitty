import { User } from './user';
import { defaultUsers } from '../lists';

export class ReceiptPosition {
    public Id: string;
    public TimeStamp: number;
    public ReceiptId: string;
    public User: User = null;
    public Description = '';
    public Amount = 0;

    get Icon(): string {
        if (this.User === null || this.User === undefined) {
            return;
        }

        return this.User.Icon;
    }

    // tslint:disable: no-string-literal
    public static Map(doc: any): ReceiptPosition {
        const receiptPos = new ReceiptPosition();
        receiptPos.Id = doc.id;
        receiptPos.ReceiptId = doc.data()['receiptId'];

        const userName = doc.data()['user'];
        receiptPos.User = defaultUsers.find(u => u.Name === userName);

        if (!receiptPos.User){
            receiptPos.User = new User();
            receiptPos.User.Name = userName;
            receiptPos.User.Icon = 'nutrition-outline';
        }

        receiptPos.Description = doc.data()['description'];
        receiptPos.Amount = doc.data()['amount'];
        return receiptPos;
    }
}
