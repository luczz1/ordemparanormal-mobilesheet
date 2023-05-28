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
  public charName: string | null = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ionViewDidEnter(): void {
    this.charName = localStorage.getItem('name');

    this.characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
  }
}
