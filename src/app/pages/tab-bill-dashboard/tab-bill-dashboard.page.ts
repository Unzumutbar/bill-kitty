import { Bill, Receipt, SecretAudio } from '../../shared/models';
import { Component, OnInit } from '@angular/core';

import { CheckStatus } from '../../shared/enums';
import { ConfirmBillPage } from '../confirm-bill/confirm-bill.page';
import { DeleteReceiptPage } from '../delete-receipt/delete-receipt.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalController } from '@ionic/angular';
import { NotificationService } from '../../services/notification.service';
import { UpdaterecordComponent } from '../../components/updaterecord/updaterecord.component';

@Component({
  selector: 'app-tab-bill-dashboard',
  templateUrl: 'tab-bill-dashboard.page.html',
  styleUrls: ['tab-bill-dashboard.page.scss']
})
export class TabBillDashboardPage implements OnInit {
  public bill: Bill;
  public isAudioPlaying: boolean;

  constructor(
    private modalController: ModalController,
    private notify: NotificationService,
    private firebaseService: FirebaseService
  ) {
    this.bill = new Bill();
  }

  public ngOnInit() {
  }

  public async ionViewWillEnter(): Promise<any>{
    this.isAudioPlaying = false;
    await this.loadData();
  }

  private async loadData(){
    const spinner = await this.notify.showSpinnerLoadingData();

    this.bill = await this.firebaseService.Bill.getUnpaid();

    await spinner.hide();
  }

  public async createBill(){
    await this.openConfirmBillDialog(this.bill, async (check) => {
      if (check === CheckStatus.Approve) {
        await this.firebaseService.Bill.add(this.bill);
        await this.notify.showSuccess('Abrechnung erfolgreich durchgeführt');
        await this.loadData();
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

  public async updateReceipt(receipt: Receipt) {
    const modal = await this.modalController.create({
      component:  UpdaterecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {
          receipt,
      }
    });

    modal.onDidDismiss().then(async (dataReturned) => {
      if (dataReturned !== null) {
        const result = dataReturned.data as CheckStatus;
        await this.loadData();
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

    modal.onDidDismiss().then(async (dataReturned) => {
      if (dataReturned !== null) {
        const result = dataReturned.data as CheckStatus;
        if (result === CheckStatus.Approve) {
          await this.firebaseService.Receipt.delete(receipt);
          await this.loadData();
        }
      }
    });

    return await modal.present();
  }

  public playAudio(){
    if (!this.isAudioPlaying) {
      SecretAudio.play();
    } else {
      SecretAudio.stop();
    }
  }
}
