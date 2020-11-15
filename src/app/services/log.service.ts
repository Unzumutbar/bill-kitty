import { Bill, Log, LogType, Receipt } from '../shared/models';

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private firestore: AngularFirestore) { }

  // tslint:disable: no-string-literal
  private sendLog(log: Log){
    const logDoc = {};
    logDoc['timestamp'] = new Date().getTime();
    logDoc['Type'] = log.typeString;
    logDoc['message'] = log.Message;

    this.firestore.collection('/Logs/').add(logDoc);
  }

  public logReceiptUpdate(receipt: Receipt) {
    const log = new Log();
    log.Type = LogType.Update;
    log.Message = `Quittung wurde aktualisiert: ${receipt.Id} | ${receipt.User.Name} | ${receipt.DisplayDate} | ${receipt.Description} | ${receipt.Amount}`;
    this.sendLog(log);
  }

  public logReceiptAdd(receipt: Receipt) {
    const log = new Log();
    log.Type = LogType.New;
    log.Message = `Quittung wurde hinzugefügt: ${receipt.User.Name} | ${receipt.DisplayDate} | ${receipt.Description} | ${receipt.Amount}`;
    this.sendLog(log);
  }

  public logReceiptDelete(receipt: Receipt) {
    const log = new Log();
    log.Type = LogType.Delete;
    log.Message = `Quittung wurde gelöscht: ${receipt.Id} | ${receipt.User.Name} | ${receipt.DisplayDate} | ${receipt.Description} | ${receipt.Amount}`;
    this.sendLog(log);
  }

  public logBillAdd(bill: Bill) {
    const log = new Log();
    log.Type = LogType.New;
    log.Message = `Abbrechnung wurde hinzugefügt: ${bill.StartDate}-${bill.EndDate} | ${bill.ReceiptCount} | ${bill.TotalAmount}`;
    this.sendLog(log);
  }

  public logLoginAttempt(username: string, successfull: boolean) {
    const log = new Log();
    if (successfull) {
      log.Type = LogType.LoginSuccess;
      log.Message = `Login erfolgreich: ${username}`;
    } else {
      log.Type = LogType.LoginFailed;
      log.Message = `Login nicht erfolgreich: ${username}`;
    }

    this.sendLog(log);
  }
}
