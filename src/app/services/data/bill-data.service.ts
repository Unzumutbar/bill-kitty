import { Bill, Pagination, Receipt } from '../../shared/models';

import { DocumentData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BillDataService {

  private name = '/Bills/';
  // tslint:disable: no-string-literal
  constructor(private logService: LogService) { }

  public async get(billId: string): Promise<Bill>{
    const bill = new Bill();
    const billData = await firebase.firestore()
    .collection('/Receipts/')
    .where('billId', '==', billId)
    .orderBy('timestamp', 'desc')
    .get();

    const receipts = billData.docs.map(e => {
      return Receipt.Map(e);
    });
    bill.Init(receipts);

    return bill;
  }

  public async getAll(): Promise<Bill[]>{
    const billRef = firebase.firestore()
    .collection(this.name)
    .orderBy('timestamp', 'desc');

    const billData = await billRef.get();

    const bills = billData.docs.map(e => {
      return Bill.Map(e);
    });

    return bills;
  }

  public async getFirstPage(pagination: Pagination): Promise<Pagination>{
    const billData = await firebase.firestore()
      .collection(this.name)
      .orderBy('timestamp', 'desc')
      .limit(pagination.PageSize)
      .get();

    pagination.Page = 1;
    pagination.FirstInResponse = null;
    pagination.LastInResponse = null;
    pagination.FirstInPreviousResponse = null;
    pagination.LastInPreviousResponse = null;

    return this.prepareBillPagination(billData.docs, pagination);
  }

  public async getNextPage(pagination: Pagination): Promise<Pagination>{
    pagination.Page++;
    const billData = await firebase.firestore()
    .collection(name)
    .orderBy('timestamp', 'desc')
    .startAfter(pagination.LastInResponse)
    .limit(pagination.PageSize)
    .get();

    return this.prepareBillPagination(billData.docs, pagination);
  }

  public async getPreviousPage(pagination: Pagination): Promise<Pagination>{
    if (pagination.Page === 1) {
      return pagination;
    }

    pagination.Page--;
    const billData = await firebase.firestore()
    .collection(this.name)
    .orderBy('timestamp', 'desc')
    .startAfter(pagination.LastInResponse)
    .limit(pagination.PageSize)
    .get();

    return this.prepareBillPagination(billData.docs, pagination);
  }

  private prepareBillPagination(res: DocumentData[], pagination: Pagination): Pagination {
    pagination.FirstInPreviousResponse = pagination.FirstInResponse;
    pagination.LastInPreviousResponse = pagination.LastInResponse;

    pagination.FirstInResponse = res[0].doc;
    pagination.LastInResponse = res[res.length - 1].doc;

    const bills = res.map(e => {
      return Bill.Map(e);
    });

    pagination.Data = bills;

    return pagination;
  }

  public async getUnpaid(): Promise<Bill>{
    const bill = new Bill();
    const billData = await firebase.firestore()
    .collection('/Receipts/')
    .where('billId', '==', '')
    .orderBy('timestamp', 'desc')
    .get();

    const receipts = billData.docs.map(e => {
      return Receipt.Map(e);
    });
    bill.Init(receipts);

    return bill;
  }

  public async add(bill: Bill): Promise<Bill> {
    const billDoc = {};
    billDoc['timestamp'] = new Date().getTime();
    billDoc['receiptCount'] = bill.ReceiptCount;
    billDoc['totalamount'] = bill.TotalAmount;
    billDoc['startdate'] = bill.StartDate.getTime();
    billDoc['enddate'] = bill.EndDate.getTime();

    const addedBillDoc = await firebase.firestore().collection(this.name).add(billDoc);
    for (const receipt of bill.Receipts) {
      const receiptDoc = {};
      receiptDoc['billId'] = addedBillDoc.id;
      await firebase.firestore().doc('/Receipts/' + receipt.Id).update(receiptDoc);
    }
    const addedBill = Bill.Map(addedBillDoc);
    await this.logService.billAdd(addedBill);

    return addedBill;
  }
}
