import { LogType } from '../models';

export class Log {
    Id: string;
    TimeStamp: number;
    Date: Date;
    Type: LogType;
    Message: string;

    get typeString(): string {
        if (this.Type === null || this.Type  === undefined || this.Type === LogType.Undefined) {
            return 'Undefined';
        }

        if (this.Type === LogType.New) {
            return 'New';
        }

        if (this.Type === LogType.Update) {
            return 'Update';
        }

        if (this.Type === LogType.Delete) {
            return 'Delete';
        }

        if (this.Type === LogType.Error) {
            return 'Error';
        }

        if (this.Type === LogType.LoginSuccess) {
            return 'Login Success';
        }

        if (this.Type === LogType.LoginFailed) {
            return 'Login Failed';
        }

        return 'Undefined';
    }
}
