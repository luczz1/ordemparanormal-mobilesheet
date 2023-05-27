import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { CharacterModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';

@Component({
  selector: 'app-combat-attr',
  templateUrl: 'combat-attr.page.html',
  styleUrls: ['combat-attr.page.scss'],
})
export class CombatAttrPage implements ViewDidEnter {
  public characterID = 0;

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController
  ) {}

  ionViewDidEnter(): void {
    const characterID = Number(this.activatedRoute.snapshot.paramMap.get('characterid'));
    this.characterID = characterID;
  }

}
