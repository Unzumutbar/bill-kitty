import { Bill, Log, Receipt, ReceiptPosition } from '../../shared/models';

import { Injectable } from '@angular/core';
import { LogType } from '../../shared/enums';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private name = '/Logs/';

  constructor() { }

  // tslint:disable: no-string-literal
  private async sendLog(log: Log){
    const logDoc = {};
    logDoc['timestamp'] = new Date().getTime();
    logDoc['Type'] = log.typeString;
    logDoc['message'] = log.Message;

    await firebase.firestore().collection(this.name).add(logDoc);
  }

  public async receiptUpdate(receipt: Receipt) {
    const log = new Log();
    log.Type = LogType.Update;
    log.Message = `Quittung wurde aktualisiert: ${receipt.Id} | ${receipt.User.Name} | ${receipt.DisplayDate} | ${receipt.Description} | ${receipt.Amount}`;
    await this.sendLog(log);
  }

  public async receiptAdd(receipt: Receipt) {
    const log = new Log();
    log.Type = LogType.New;
    log.Message = `Quittung wurde hinzugefügt: ${receipt.User.Name} | ${receipt.DisplayDate} | ${receipt.Description} | ${receipt.Amount}`;
    await this.sendLog(log);
  }

  public async receiptDelete(receipt: Receipt) {
    const log = new Log();
    log.Type = LogType.Delete;
    log.Message = `Quittung wurde gelöscht: ${receipt.Id} | ${receipt.User.Name} | ${receipt.DisplayDate} | ${receipt.Description} | ${receipt.Amount}`;
    await this.sendLog(log);
  }

  public async receiptPositionUpdate(receiptPosition: ReceiptPosition) {
    const log = new Log();
    log.Type = LogType.Update;
    log.Message = `Quittungsposition wurde aktualisiert: ${receiptPosition.Id} | ${receiptPosition.User.Name} | ${receiptPosition.Description} | ${receiptPosition.Amount}`;
    await this.sendLog(log);
  }

  public async receiptPositionAdd(receiptPosition: ReceiptPosition) {
    const log = new Log();
    log.Type = LogType.New;
    log.Message = `Quittungsposition wurde hinzugefügt: ${receiptPosition.User.Name} | ${receiptPosition.Description} | ${receiptPosition.Amount}`;
    await this.sendLog(log);
  }

  public async receiptPositionDelete(receiptPosition: ReceiptPosition) {
    const log = new Log();
    log.Type = LogType.Delete;
    log.Message = `Quittungsposition wurde gelöscht: ${receiptPosition.Id} | ${receiptPosition.User.Name} | ${receiptPosition.Description} | ${receiptPosition.Amount}`;
    await this.sendLog(log);
  }

  public async billAdd(bill: Bill) {
    const log = new Log();
    log.Type = LogType.New;
    log.Message = `Abbrechnung wurde hinzugefügt: ${bill.StartDate}-${bill.EndDate} | ${bill.ReceiptCount} | ${bill.TotalAmount}`;
    await this.sendLog(log);
  }

  public async loginAttempt(username: string, successfull: boolean) {
    const log = new Log();
    if (successfull) {
      log.Type = LogType.LoginSuccess;
      log.Message = `Login erfolgreich: ${username}`;
    } else {
      log.Type = LogType.LoginFailed;
      log.Message = `Login nicht erfolgreich: ${username}`;
    }

    await this.sendLog(log);
  }
}
