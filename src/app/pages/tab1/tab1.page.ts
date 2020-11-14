import { Bill, Record } from '../../shared/models';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
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
    private notify: NotificationService
  ) {}

  public ngOnInit() {
    this.loadData();
  }

  private loadData(){
    this.bill = new Bill();
    this.firestore
      .collection('/Records/', ref => ref.where('billId', '==', ''))
      .snapshotChanges()
      .subscribe(res => {
      if (res){
        const records = res.map(e => {
          return Record.Map(e);
        });
        this.bill.Init(records);
      }
    });
  }

  public async updateRecord(record: Record) {
    const modal = await this.modalController.create({
      component:  UpdaterecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {
          id: record.Id,
          type: record.User,
          description: record.Description,
          amount: record.Amount,
      }
    });
    return await modal.present();
  }

  public deleteRecord(id: string){
    this.firestore.doc('/Records/' + id).delete();
  }

  // tslint:disable: no-string-literal
  public createBill(){
    const newBillDocument = {};
    newBillDocument['timestamp'] = new Date().getTime();
    newBillDocument['recordCount'] = this.bill.RecordCount;
    newBillDocument['totalamount'] = this.bill.TotalAmount;
    newBillDocument['startdate'] = this.bill.StartDate.getTime();
    newBillDocument['enddate'] = this.bill.EndDate.getTime();

    this.firestore.collection('/Bills/').add(newBillDocument).then(billDoc => {
      for (const rec of this.bill.Records) {
        this.addBillIdToRecord(rec.Id, billDoc.id);
      }
      this.loadData();

      this.notify.showSuccess('Abrechnung erfolgreich durchgeführt');
    });
  }

  private addBillIdToRecord(recordId: string, billId: string){
    const recordDocument = {};
    recordDocument['billId'] = billId;
    this.firestore.doc('/Records/' + recordId).update(recordDocument);
  }

}
