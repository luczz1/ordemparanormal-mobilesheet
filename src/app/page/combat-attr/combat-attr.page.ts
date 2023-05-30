import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { AttackModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-combat-attr',
  templateUrl: 'combat-attr.page.html',
  styleUrls: ['combat-attr.page.scss'],
})
export class CombatAttrPage implements ViewDidEnter, ViewDidLeave {
  public characterID = 0;
  public charName: string | null = '';

  public attacksList: AttackModel[] = [];
  public totalDefense = 0;

  public pageLoaded = false;
  public openStatusModal = false;

  public attacksForm: any = new FormGroup({
    id: new FormControl(0),
    attack_name: new FormControl('', [Validators.required]),
    test: new FormControl(''),
    damage: new FormControl(0, [Validators.required]),
    critical_or_range_or_special: new FormControl(''),
  });

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    this.generic.multLoading(true);

    const characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
    this.characterID = characterID;

    this.getTotalDefense();
    this.charName = localStorage.getItem('name');
  }

  ionViewDidLeave(): void {
    this.pageLoaded = false;
  }

  public getTotalDefense() {
    this.charactersService.getCharacterTotalDefense(this.characterID).subscribe(
      (res) => {
        this.totalDefense = res[0].defense_total;
        this.getDefenses();
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public getDefenses() {
    this.charactersService.getCharacterDefenses(this.characterID).subscribe(
      (res) => {
        this.getAttacks();
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public getAttacks() {
    this.charactersService.getCharacterAttacks(this.characterID).subscribe(
      (res) => {
        this.attacksList = res;
        this.generic.multLoading(false);

        this.pageLoaded = true;
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public addAttacks() {
    if (this.attacksForm.valid) {
      const obj = this.attacksForm.getRawValue();

      this.charactersService
        .addCharacterAttacks(this.characterID, obj)
        .subscribe(
          (res) => {
            this.getTotalDefense();
            this.openStatusModal = false;
          },
          (error) => {
            this.generic.presentToast(error.error, 3);
          }
        );
    }
  }
}
