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
  public pageLoaded = false;

  public totalWeight = '';
  public timeoutId: ReturnType<typeof setTimeout> | null = null;

  public inventoryItems: InventoryModel[] = [];
  public inventoryInfos = new FormGroup({
    prestige_points: new FormControl(),
    patent: new FormControl(),
    item_limit_1: new FormControl(),
    item_limit_2: new FormControl(),
    item_limit_3: new FormControl(),
    item_limit_4: new FormControl(),
    credit_limit: new FormControl(),
    max_load: new FormControl(),
    max_spc_load: new FormControl(),
  });

  public hideItems = false;
  public hideInventoryInfos = true;

  public hideCreditsSuggestions = true;
  public hidePatentSuggestions = true;

  public creditsGroup = ['Baixo', 'Médio', 'Alto', 'Ilimitado'];
  public patentsGroup = [
    'Mundano',
    'Recruta',
    'Operador',
    'Agente Especial',
    'Oficial de Operações',
    'Agente de Elite',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    public generic: GenericService,
    public modalController: ModalController
  ) {}

  ionViewDidEnter(): void {
    this.charName = localStorage.getItem('name');

    this.characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.hideItems = false;
    this.hideInventoryInfos = true;

    this.generic.getInventoryWeight().then((res) => {
      if (res) {
        this.totalWeight =
          this.generic.currentWeight + '/' + this.generic.totalWeight;

        if (
          localStorage.getItem('inventoryInfos') &&
          localStorage.getItem('inventoryItems')
        ) {
          this.inventoryInfos.patchValue(
            JSON.parse(localStorage.getItem('inventoryInfos'))
          );
          this.inventoryItems = JSON.parse(
            localStorage.getItem('inventoryItems')
          );

          this.pageLoaded = true;
        } else {
          if (localStorage.getItem('loaded')) {
            this.generic.multLoading(true);
          }

          this.getInventoryInfos();
        }
      } else {
        this.generic.presentToast('Ocorreu um erro ao carregar dados.', 3);
        this.generic.multLoading(false);
      }
    });
  }

  ionViewDidLeave() {
    this.pageLoaded = false;
  }

  public getInventoryInfos() {
    this.charactersService.getInventoryInfos(this.characterID).subscribe(
      (res) => {
        this.inventoryInfos.patchValue(res.inventoryInfo);
        localStorage.setItem(
          'inventoryInfos',
          JSON.stringify(res.inventoryInfo)
        );
        this.getInventoryItems();
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
        this.generic.multLoading(false);
      }
    );
  }

  public editInventoryInfos() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      let obj = this.inventoryInfos.getRawValue();

      this.generic.weightGet = false;
      localStorage.removeItem('totalWeight');

      obj.prestige_points = Number(obj.prestige_points);

      this.charactersService
        .editInventoryInfos(this.characterID, obj)
        .subscribe(
          (res) => {
            this.generic.getInventoryWeight().then((res) => {
              if (res) {
                this.totalWeight =
                  this.generic.currentWeight + '/' + this.generic.totalWeight;

                localStorage.removeItem('inventoryInfos');

                localStorage.setItem('inventoryInfos', JSON.stringify(obj));
              } else {
                this.generic.presentToast(
                  'Ocorreu um erro ao carregar dados.',
                  3
                );
              }
            });
          },
          (error) => {
            this.generic.presentToast(error.error, 3);
            this.generic.multLoading(false);
          }
        );
    }, 1000);
  }

  public getInventoryItems() {
    this.charactersService.getInventoryItems(this.characterID).subscribe(
      (res) => {
        this.inventoryItems = res.inventory_items;
        localStorage.setItem(
          'inventoryItems',
          JSON.stringify(res.inventory_items)
        );
        this.pageLoaded = true;

        if (localStorage.getItem('loaded')) {
          this.generic.multLoading(false);
        }
      },
      (error) => {
        this.generic.presentToast(error.error);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public addInventoryItems(
    item_name: string | any,
    category: string | any,
    slots: number | any
  ) {
    this.generic.weightGet = false;

    let data = {
      item_id: 0,
      item_name,
      category,
      slots,
    };

    localStorage.removeItem('totalWeight');

    this.charactersService.addInventoryItems(this.characterID, data).subscribe({
      next: () => {
        this.generic.getInventoryWeight().then((res) => {
          if (res) {
            this.modalController.dismiss();
            this.totalWeight =
              this.generic.currentWeight + '/' + this.generic.totalWeight;
            this.getInventoryInfos();
          } else {
            this.generic.presentToast('Ocorreu um erro ao carregar dados.', 3);
          }
        });
      },
      error: (err) => this.generic.presentToast(err.error, 3),
    });
  }

  public async deleteInventoryItems(itemId: number, item_name: string) {
    const ok = await this.generic.alertBox(
      'ATENÇÃO',
      `Deseja mesmo excluir o item ${item_name}?`
    );

    if (ok) {
      this.generic.weightGet = false;
      localStorage.removeItem('totalWeight');

      this.charactersService.deleteInventoryItems(itemId).subscribe({
        next: () => {
          this.generic.getInventoryWeight().then((res) => {
            if (res) {
              this.totalWeight =
                this.generic.currentWeight + '/' + this.generic.totalWeight;
              this.getInventoryInfos();
            } else {
              this.generic.presentToast(
                'Ocorreu um erro ao carregar dados.',
                3
              );
            }
          });
        },
        error: (err) => this.generic.presentToast(err.error, 3),
      });
    }
  }

  public hideSuggestion(name: string) {
    setTimeout(() => {
      this[name] = true;
    }, 50);
  }
}
