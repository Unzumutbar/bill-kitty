import { ActivatedRoute, Router } from '@angular/router';
import { Bill, Receipt } from '../../shared/models';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.page.html',
  styleUrls: ['./bill-details.page.scss'],
})
export class BillDetailsPage implements OnInit {

  private id: string;
  public bill: Bill;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.billId;
      }
    });
  }

  public ngOnInit() {
    this.loadData();
  }

  private loadData(){
    this.bill = new Bill();
    this.firestore
      .collection('/Receipts/', ref => ref.where('billId', '==', this.id))
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
}
