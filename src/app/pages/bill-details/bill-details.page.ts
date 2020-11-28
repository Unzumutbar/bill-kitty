import { ActivatedRoute, Router } from '@angular/router';
import { Bill, Receipt } from '../../shared/models';
import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.page.html',
  styleUrls: ['./bill-details.page.scss'],
})
export class BillDetailsPage implements OnInit {

  private id: string;
  public bill: Bill;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bill = new Bill();
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.billId;
      }
    });
  }

  public ngOnInit() {
  }

  public async ionViewWillEnter(): Promise<any>{
    await this.loadData();
  }

  private async loadData(){
    this.bill = await this.firebaseService.Bill.get(this.id);
  }
}
