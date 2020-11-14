import { Component, Input, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-updaterecord',
  templateUrl: './updaterecord.component.html',
  styleUrls: ['./updaterecord.component.scss'],
})
export class UpdaterecordComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  @Input() description: string;
  @Input() amount: number;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  // tslint:disable: no-string-literal
  public UpdateRecord(type, description, amount){
    const updaterecord = {};
    updaterecord['type'] = type,
    updaterecord['description'] = description,
    updaterecord['amount'] = amount,
    this.firestore.doc('/Records/' + this.id).update(updaterecord).then(() => {
      this.modalController.dismiss();
    });
  }

  CloseModal(){
    this.modalController.dismiss();
  }
}
