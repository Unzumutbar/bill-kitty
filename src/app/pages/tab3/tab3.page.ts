import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Bill } from '../../shared/models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  public bills: Bill[];
  public page = 0;
  public pageSize = 20;
  public firstInResponse: any;
  public lastInResponse: any;
  public firstInPreviousResponse: any;
  public lastInPreviousResponse: any;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    public router: Router
  ) {}

  public ngOnInit(){
    this.loadData();
  }

  public loadData() {
    this.bills = [];
    this.firstInResponse = null;
    this.lastInResponse = null;
    this.firstInPreviousResponse = null;
    this.lastInPreviousResponse = null;

    this.firestore
    .collection('/Bills/', ref => ref.orderBy('timestamp', 'desc')
    .limit(this.pageSize))
    .snapshotChanges()
    .subscribe(res => {
      if (res){
        this.prepareBills(res);
      }
    });
  }

  private prepareBills(res: DocumentChangeAction<unknown>[]) {
    this.firstInPreviousResponse = this.firstInResponse;
    this.lastInPreviousResponse = this.lastInResponse;

    this.firstInResponse = res[0].payload.doc;
    this.lastInResponse = res[res.length - 1].payload.doc;

    this.bills = res.map(e => {
      return Bill.Map(e);
    });
  }

  public async viewBill(bill: Bill) {
    const navigationExtras: NavigationExtras = {
      state: {
        billId: bill.Id,
      },
    };
    this.router.navigate(['bill'], navigationExtras);
  }

  public nextPage() {
    if (this.bills.length < this.pageSize) {
      return;
    }

    this.page++;
    this.firestore
    .collection('/Bills/', ref => ref.orderBy('timestamp', 'desc')
    .startAfter(this.lastInResponse)
    .limit(this.pageSize))
    .snapshotChanges()
    .subscribe(res => {
      if (res){
        this.prepareBills(res);
      }
    });
  }

  public prevPage() {
    if (this.page < 1) {
      return;
    }

    this.page--;
    this.firestore
    .collection('/Bills/', ref => ref.orderBy('timestamp', 'desc')
    .startAt(this.firstInPreviousResponse)
    .endBefore(this.lastInResponse)
    .limitToLast(this.pageSize))
    .snapshotChanges()
    .subscribe(res => {
      if (res){
        this.prepareBills(res);
      }
    });
  }
}

