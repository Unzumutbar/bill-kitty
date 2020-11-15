import { Bill, CheckStatus, Receipt, SecretAudio } from '../../shared/models';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ConfirmBillPage } from '../confirm-bill/confirm-bill.page';
import { DeleteReceiptPage } from '../delete-receipt/delete-receipt.page';
import { LogService } from '../../services/log.service';
import { ModalController } from '@ionic/angular';
import { NotificationService } from '../../services/notification.service';
import { UpdaterecordComponent } from '../../components/updaterecord/updaterecord.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public bill: Bill;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private notify: NotificationService,
    private logService: LogService
  ) {}

  public ngOnInit() {
    this.loadData();
  }

  private loadData(){
    this.bill = new Bill();
    this.firestore
      .collection('/Receipts/', ref => ref.where('billId', '==', ''))
      .snapshotChanges()
      .subscribe(res => {
      if (res){
        const receipts = res.map(e => {
          return Receipt.Map(e);
        });
        this.bill.Init(receipts);
      }
    });
  }

  // tslint:disable: no-string-literal
  public async createBill(){
    await this.openConfirmBillDialog(this.bill, async (check) => {
      if (check === CheckStatus.Approve) {
        const newBillDocument = {};
        newBillDocument['timestamp'] = new Date().getTime();
        newBillDocument['receiptCount'] = this.bill.ReceiptCount;
        newBillDocument['totalamount'] = this.bill.TotalAmount;
        newBillDocument['startdate'] = this.bill.StartDate.getTime();
        newBillDocument['enddate'] = this.bill.EndDate.getTime();

        this.firestore.collection('/Bills/').add(newBillDocument).then(billDoc => {
          for (const rec of this.bill.Receipts) {
            this.addBillIdToReceipt(rec.Id, billDoc.id);
          }
          this.notify.showSuccess('Abrechnung erfolgreich durchgeführt');
          this.loadData();
        });
      }
    });
  }

  private async openConfirmBillDialog(
    bill: Bill,
    callback: (s: CheckStatus) => any
  ): Promise<CheckStatus> {
    let result: CheckStatus = CheckStatus.Undefined;

    const modal = await this.modalController.create({
      component: ConfirmBillPage,
      backdropDismiss: false,
      componentProps: {
        bill,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        result = dataReturned.data as CheckStatus;
        callback(result);
      }
    });

    await modal.present();

    return result;
  }

  private addBillIdToReceipt(receiptId: string, billId: string){
    const receiptDocument = {};
    receiptDocument['billId'] = billId;
    this.firestore.doc('/Receipts/' + receiptId).update(receiptDocument);
  }

  public async updateReceipt(receipt: Receipt) {
    const modal = await this.modalController.create({
      component:  UpdaterecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {
          receipt,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const result = dataReturned.data as CheckStatus;
        this.loadData();
      }
    });

    return await modal.present();
  }

  public async deleteReceipt(receipt: Receipt){
    const modal = await this.modalController.create({
      component:  DeleteReceiptPage,
      cssClass: 'my-custom-class',
      componentProps: {
          receipt,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const result = dataReturned.data as CheckStatus;
        if (result === CheckStatus.Approve) {
          this.firestore.doc('/Receipts/' + receipt.Id).delete().then(
            () => {
              this.logService.logReceiptDelete(receipt);
              this.loadData();
          });
        }
      }
    });

    return await modal.present();
  }

  public playAudio(){
    SecretAudio.play();
  }
}
