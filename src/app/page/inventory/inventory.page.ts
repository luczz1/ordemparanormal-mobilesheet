import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.scss'],
})
export class InventoryPage implements ViewDidEnter {
  public characterID = 0;

  constructor(private activatedRoute: ActivatedRoute) {}

  ionViewDidEnter(): void {
    this.characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
  }
}
