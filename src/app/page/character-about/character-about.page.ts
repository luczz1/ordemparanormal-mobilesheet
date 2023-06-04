import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { InventoryModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-character-about',
  templateUrl: 'character-about.page.html',
  styleUrls: ['character-about.page.scss'],
})
export class CharacterAboutPage implements ViewDidEnter, ViewDidLeave {
  public characterID = 0;
  public charName: string | null = '';

  public pageLoaded = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    public generic: GenericService,
  ) {}

  ionViewDidEnter(): void {
    this.charName = localStorage.getItem('name');

    this.characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.pageLoaded = true;
  }

  ionViewDidLeave(): void {
  }
}
