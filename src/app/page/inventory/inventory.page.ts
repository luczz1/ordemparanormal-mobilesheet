import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { InventoryModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.scss'],
})
export class InventoryPage implements ViewDidEnter, ViewDidLeave {
  public characterID = 0;
  public charName: string | null = '';

  public openAddInventoryItemModal = false;

  public inventoryItems: InventoryModel[] = [];
  public inventoryInfos = new FormGroup({
    prestige_points: new FormControl(),
    patent: new FormControl(),
    item_limit: new FormControl(),
    credit_limit: new FormControl(),
    max_load: new FormControl(),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    private generic: GenericService,
    public modalController: ModalController
  ) {}

  ionViewDidEnter(): void {
    this.generic.multLoading(true);

    this.charName = localStorage.getItem('name');

    this.characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.getInventoryInfos();
  }

  ionViewDidLeave(): void {
    this.inventoryItems = [];
  }

  public getInventoryInfos() {
    this.charactersService.getInventoryInfos(this.characterID).subscribe(
      (res) => {
        this.inventoryInfos.patchValue(res.inventoryInfo)
        this.getInventoryItems();
      },
      (error) => {
        this.generic.presentToast(error.error.error, 3);
        this.generic.multLoading(false);
      }
    );
  }

  public editInventoryInfos() {
    let obj = this.inventoryInfos.getRawValue();

    obj.prestige_points = Number(obj.prestige_points)

    this.charactersService.editInventoryInfos(this.characterID, obj).subscribe(
      (res) => {
        this.getInventoryItems();
      },
      (error) => {
        this.generic.presentToast(error.error.error, 3);
        this.generic.multLoading(false);
      }
    );
  }

  public getInventoryItems() {
    this.charactersService.getInventoryItems(this.characterID).subscribe(
      (res) => {
        this.inventoryItems = res.inventory_items;
        this.generic.multLoading(false);
      },
      (error) => {
        this.generic.presentToast(error.error.error);
        this.generic.multLoading(false);
      }
    );
  }

  public addInventoryItems(item_name: string | any, category: string | any, slots: number | any,) {
    let data = {
      item_id: 0,
      item_name,
      category,
      slots,
    };

    this.charactersService.addInventoryItems(this.characterID, data).subscribe({
      next: () => this.getInventoryItems(),
      error: (err) => this.generic.presentToast(err.error.error, 3),
    });
  }

  public async deleteInventoryItems(itemId: number, item_name: string) {
    const ok = await this.generic.alertBox(
      'ATENÇÃO',
      `Deseja mesmo excluir o item ${item_name}?`
    );

    if (ok) {
      this.charactersService.deleteInventoryItems(itemId).subscribe({
        next: () => this.getInventoryItems(),
        error: (err) => this.generic.presentToast(err.error.error, 3),
      });
    }
  }
}
