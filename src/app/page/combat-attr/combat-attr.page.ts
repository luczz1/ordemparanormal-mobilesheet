import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { CharacterModel } from 'src/app/models/character';
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

  public totalDefense = 0;

  public pageLoaded = false;

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
        this.generic.presentToast(error.error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  // public editTotalDefense() {
  //   this.charactersService.getCharacterTotalDefense(this.characterID).subscribe(
  //     (res) => {
  //       this.totalDefense = res.defense_total;
  //     },
  //     (error) => {
  //       this.generic.presentToast(error.error.error, 3);
  //     }
  //   );
  // }

  public getDefenses() {
    this.charactersService.getCharacterDefenses(this.characterID).subscribe(
      (res) => {
        console.log('defesas: ', res);
        this.getAttacks();
      },
      (error) => {
        this.generic.presentToast(error.error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public getAttacks() {
    this.charactersService.getCharacterAttacks(this.characterID).subscribe(
      (res) => {
        console.log('ataques', res);
        this.generic.multLoading(false);

        this.pageLoaded = true;
      },
      (error) => {
        this.generic.presentToast(error.error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }
}
