import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Receipt } from '../../shared/models';
import { ReceiptPosition } from '../../shared/models/receipt-position';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ReceiptPositionDataService {

  private name = '/ReceiptPositions/';
  // tslint:disable: no-string-literal
  constructor(private logService: LogService) { }

  public async getByReceipt(receiptId: string): Promise<ReceiptPosition[]>{
    const positionData = await firebase.firestore()
    .collection(this.name)
    .where('receiptId', '==', receiptId)
    .get();

    const positions = positionData.docs.map(e => {
      return ReceiptPosition.Map(e);
    });

    return positions;
  }

  public async add(receiptPosition: ReceiptPosition): Promise<ReceiptPosition> {
    const positionDoc = {};
    positionDoc['timeStamp'] = receiptPosition.TimeStamp;
    positionDoc['receiptId'] = receiptPosition.ReceiptId;
    positionDoc['user'] = receiptPosition.User.Name;
    positionDoc['description'] = receiptPosition.Description;
    positionDoc['amount'] = receiptPosition.Amount;

    const addedDoc = await firebase.firestore().collection(this.name).add(positionDoc);
    receiptPosition.Id = addedDoc.id;
    await this.logService.receiptPositionAdd(receiptPosition);

    return receiptPosition;
  }

  public async delete(receiptPosition: ReceiptPosition) {
    await firebase.firestore().collection(this.name).doc(receiptPosition.Id).delete();
    await this.logService.receiptPositionDelete(receiptPosition);
  }

  public async update(receiptPosition: ReceiptPosition){
    const positionDoc = {};
    positionDoc['id'] = receiptPosition.Id;
    positionDoc['receiptId'] = receiptPosition.ReceiptId;
    positionDoc['user'] = receiptPosition.User.Name;
    positionDoc['description'] = receiptPosition.Description;
    positionDoc['amount'] = receiptPosition.Amount;

    await firebase.firestore().collection(this.name).doc(receiptPosition.Id).update(positionDoc);
    await this.logService.receiptPositionUpdate(receiptPosition);
  }
}
