import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Bill } from '../../shared/models';
import { FirebaseService } from '../../services/firebase.service';
import { NotificationService } from '../../services/notification.service';
import { Pagination } from '../../shared/models/pagination';

@Component({
  selector: 'app-tab-bill-archive',
  templateUrl: 'tab-bill-archive.page.html',
  styleUrls: ['tab-bill-archive.page.scss']
})

export class TabBillArchivePage implements OnInit {
  public bills: Bill[];
  private pagination: Pagination;

  get page(): number {
    if (this.pagination.Page === null || this.pagination.Page  === undefined) {
        return 0;
    }
    return this.pagination.Page;
  }

  get pageSize(): number {
    if (this.pagination.PageSize === null || this.pagination.PageSize  === undefined) {
        return 10;
    }
    return this.pagination.PageSize;
  }

  constructor(
    public router: Router,
    private firebaseService: FirebaseService,
    private notify: NotificationService
  ) {
    this.bills = [];
    this.pagination = new Pagination();
    this.pagination.PageSize = 10;
    this.pagination.Data = new Array<Bill>();
  }

  public ngOnInit(){
  }

  public async ionViewWillEnter(): Promise<any>{
    await this.firstPage();
  }

  public async firstPage() {
    const spinner = await this.notify.showSpinnerLoadingData();

    this.pagination = await this.firebaseService.Bill.getFirstPage(this.pagination);
    this.bills = this.pagination.Data;

    await spinner.hide();
  }

  public async nextPage() {
    if (this.bills.length < this.pageSize) {
      return;
    }
    const spinner = await this.notify.showSpinnerLoadingData();

    this.pagination = await this.firebaseService.Bill.getNextPage(this.pagination);
    this.bills = this.pagination.Data;

    await spinner.hide();
  }

  public async prevPage() {
    if (this.page < 1) {
      return;
    }
    const spinner = await this.notify.showSpinnerLoadingData();

    this.pagination = await this.firebaseService.Bill.getPreviousPage(this.pagination);
    this.bills = this.pagination.Data;

    await spinner.hide();
  }

  public async viewBill(bill: Bill) {
    const navigationExtras: NavigationExtras = {
      state: {
        billId: bill.Id,
      },
    };
    this.router.navigate(['bill'], navigationExtras);
  }
}

