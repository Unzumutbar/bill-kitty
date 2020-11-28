import { BillDataService } from './data/bill-data.service';
import { Injectable } from '@angular/core';
import { LogService } from './data/log.service';
import { ReceiptDataService } from './data/receipt-data.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private logService: LogService) {
  }

  public get Bill(): BillDataService {
    return new BillDataService(this.logService);
  }

  public get Receipt(): ReceiptDataService {
    return new ReceiptDataService(this.logService);
  }

}
