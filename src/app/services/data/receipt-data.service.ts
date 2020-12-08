import { Receipt, ReceiptPosition } from '../../shared/models';

import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { ReceiptPositionDataService } from './receipt-position-data.service';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ReceiptDataService {

  private name = '/Receipts/';
  private positionService: ReceiptPositionDataService;

  // tslint:disable: no-string-literal
  constructor(private logService: LogService) {
    this.positionService = new ReceiptPositionDataService(this.logService);
  }

  public async getByBillId(billId: string): Promise<Receipt[]>{
    const receiptData = await firebase.firestore()
    .collection(this.name)
    .where('billId', '==', billId)
    .orderBy('timestamp', 'desc')
    .get();

    return await this.mapAndLoadReferences(receiptData);
  }

  public async getUnpaid(): Promise<Receipt[]>{
    const receiptData = await firebase.firestore()
    .collection(this.name)
    .where('billId', '==', '')
    .orderBy('timestamp', 'desc')
    .get();

    return await this.mapAndLoadReferences(receiptData);
  }

  private async mapAndLoadReferences(receiptData: any): Promise<Receipt[]> {
    const receipts = receiptData.docs.map(e => {
      return Receipt.Map(e);
    });

    for (const receipt of receipts) {
      const positions = await this.positionService.getByReceipt(receipt.Id);
      receipt.Positions = positions;
    }

    return receipts;
  }

  public async add(receipt: Receipt): Promise<Receipt> {
    const receiptDoc = {};
    receiptDoc['timestamp'] = new Date(receipt.Date).getTime();
    receiptDoc['user'] = receipt.User.Name;
    receiptDoc['description'] = receipt.Description;
    receiptDoc['amount'] = receipt.Amount;
    receiptDoc['billId'] = receipt.BillId;

    const addedDoc = await firebase.firestore().collection(this.name).add(receiptDoc);
    receipt.Id = addedDoc.id;
    await this.logService.receiptAdd(receipt);

    return receipt;
  }

  public async delete(receipt: Receipt) {
    for (const position of receipt.Positions) {
      await this.positionService.delete(position);
    }

    await firebase.firestore().collection(this.name).doc(receipt.Id).delete();
    await this.logService.receiptDelete(receipt);
  }

  public async update(receipt: Receipt, deletedPositions: ReceiptPosition[]){


    const receiptDoc = {};
    receiptDoc['id'] = receipt.Id;
    receiptDoc['timestamp'] = new Date(receipt.Date).getTime();
    receiptDoc['user'] = receipt.User.Name;
    receiptDoc['description'] = receipt.Description;
    receiptDoc['amount'] = receipt.Amount;

    await this.updatePositions(receipt.Positions, deletedPositions);
    await firebase.firestore().collection(this.name).doc(receipt.Id).update(receiptDoc);
    await this.logService.receiptUpdate(receipt);
  }

  private async updatePositions(positions: ReceiptPosition[], deletedPositions: ReceiptPosition[]) {
    for (const position of positions) {
      if (position.Id) {
        await this.positionService.update(position);
      } else {
        await this.positionService.add(position);
      }
    }

    for (const position of deletedPositions) {
      if (position.Id) {
        await this.positionService.delete(position);
      }
    }
  }
}
