import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ModalController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillLeave,
} from '@ionic/angular';
import { CharacterModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-character-overview',
  templateUrl: 'character-overview.page.html',
  styleUrls: ['character-overview.page.scss'],
})
export class CharacterOverviewPage implements ViewDidEnter, ViewDidLeave {
  public character: CharacterModel[] = [];
  public numberOfDice = 0;
  public diceRolling = false;
  public diceResults: number[] = [];

  public openStatusModal = false;
  public modalType = '';

  public pageLoaded = false;
  public timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    const characterID = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.generic.multLoading(true);

    this.getCharacterByID(characterID);
  }

  ionViewDidLeave(): void {
    this.character = [];
    this.diceResults = [];
    this.pageLoaded = false;
  }

  public getCharacterByID(id: number) {
    this.charactersService.getCharacterByID(id).subscribe(
      (res) => {
        this.character.push(res);
        this.generic.multLoading(false);
        this.pageLoaded = true;
      },
      (error) => {
        this.generic.multLoading(false);
        this.pageLoaded = true;
      }
    );
  }

  public rollDice(numberOfDice: number | any) {
    this.numberOfDice = Number(numberOfDice);

    if (this.numberOfDice > 20 || this.numberOfDice <= 0) {
      return;
    }

    this.diceRolling = true;

    let diceInterval = setInterval(() => {
      this.diceResults = [];

      for (let i = 0; i < this.numberOfDice; i++) {
        const diceNumber = Math.ceil(Math.random() * 20);
        this.diceResults.push(diceNumber);
      }
    }, 50);

    setTimeout(() => {
      clearInterval(diceInterval);
      this.diceRolling = false;
    }, 2000);
  }

  public openModal(type: string) {
    this.diceResults = [];
    this.diceRolling = false;

    this.openStatusModal = true;
    this.modalType = type;
  }

  public increaseOrDecreaseCurrent(type: number, currentOrMax: string) {
    const currentKey = 'current_' + this.modalType;
    const maxKey = 'max_' + this.modalType;

    const currentValue = this.character[0][currentKey];
    const maxValue = this.character[0][maxKey];

    if (currentOrMax === 'current') {
      if (type === 0 && currentValue < maxValue) {
        this.character[0][currentKey]++;
        this.updateCharacterInDatabase();
      } else if (type === 1 && currentValue > 0) {
        this.character[0][currentKey]--;
        this.updateCharacterInDatabase();
      }
    } else if (currentOrMax === 'max') {
      if (type === 0 && maxValue > 0) {
        this.character[0][maxKey]++;
        this.updateCharacterInDatabase();
      } else if (type === 1 && maxValue > 1) {
        this.character[0][maxKey]--;
        if (currentValue > this.character[0][maxKey]) {
          this.character[0][currentKey] = this.character[0][maxKey];
        }
        this.updateCharacterInDatabase();
      }
    }
  }

  private updateCharacterInDatabase() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.charactersService.updateCharacter(this.character[0]).subscribe(
        (res: any) => {},
        (error: any) => console.log(error)
      );
    }, 500);
  }
}
