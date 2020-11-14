import { User } from './user';

export class SplitBill {
    public User: User;
    public SharedAmount: number;
    public PayedAmount: number;

    public get OpenAmount(): number {
        return this.PayedAmount - this.SharedAmount;
    }

    constructor(user: User) {
        this.User = user;
        this.SharedAmount = 0;
        this.PayedAmount = 0;
    }
}
