import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Receipt } from '../../shared/models';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ReceiptDataService {

  private name = '/Receipts/';
  // tslint:disable: no-string-literal
  constructor(private logService: LogService) { }

  public async add(receipt: Receipt): Promise<Receipt> {
    const receiptDoc = {};
    receiptDoc['timestamp'] = new Date(receipt.Date).getTime();
    receiptDoc['user'] = receipt.User.Name;
    receiptDoc['description'] = receipt.Description;
    receiptDoc['amount'] = receipt.Amount;
    receiptDoc['billId'] = receipt.BillId;

    const addedReceiptDoc = await firebase.firestore().collection(this.name).add(receiptDoc);
    // const addedReceipt = Receipt.Map(addedReceiptDoc.);
    await this.logService.receiptAdd(receipt);

    return receipt;
  }

  public async delete(receipt: Receipt) {
    await firebase.firestore().collection(this.name).doc(receipt.Id).delete();
    await this.logService.receiptDelete(receipt);
  }

  public async update(receipt: Receipt){
    const updateReceipt = {};
    updateReceipt['id'] = receipt.Id;
    updateReceipt['timestamp'] = new Date(receipt.Date).getTime();
    updateReceipt['user'] = receipt.User.Name;
    updateReceipt['description'] = receipt.Description;
    updateReceipt['amount'] = receipt.Amount;

    await firebase.firestore().collection(this.name).doc(receipt.Id).update(updateReceipt);
    await this.logService.receiptUpdate(receipt);
  }
}
