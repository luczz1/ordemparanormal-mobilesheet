import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  public weightShow = '';
  public characterID = 0;

  public pageLoaded = false;
  public timeoutId: ReturnType<typeof setTimeout> | null = null;

  public hiddenStatus = {
    hidden_life: 0,
    hidden_sanity: 0,
    hidden_effort: 0,
  };

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public generic: GenericService,
    private router: Router
  ) {}

  ionViewDidEnter(): void {
    const characterID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.characterID = characterID;

    this.generic.getInventoryWeight().then((res) => {
      if (res) {
        this.character = [];
        if (localStorage.getItem('characterInfos') && !localStorage.getItem('updatedChar')) {
          this.weightShow =
          this.generic.currentWeight + '/' + this.generic.totalWeight;

          this.character.push(
            JSON.parse(localStorage.getItem('characterInfos'))
          );

          const { hidden_life, hidden_sanity, hidden_effort } = JSON.parse(
            localStorage.getItem('hiddenStatus')
          );
          this.hiddenStatus = {
            hidden_life,
            hidden_sanity,
            hidden_effort,
          };

          this.pageLoaded = true;
        } else {
          this.generic.multLoading(true);
          this.getCharacterByID(characterID);
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

  public getCharacterByID(id: number) {
    this.charactersService.getCharacterByID(id).subscribe(
      (res) => {
        this.weightShow =
          this.generic.currentWeight + '/' + this.generic.totalWeight;

        const { hidden_life, hidden_sanity, hidden_effort } = res.character;
        this.hiddenStatus = {
          hidden_life,
          hidden_sanity,
          hidden_effort,
        };

        this.character.push(res.character);

        localStorage.removeItem('updatedChar')

        localStorage.setItem('characterInfos', JSON.stringify(res.character));
        localStorage.setItem('hiddenStatus', JSON.stringify(this.hiddenStatus));

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

    if (currentOrMax === 'current') {
      if (type === 0) {
        this.character[0][currentKey]++;
        this.updateCharacterInDatabase();
      } else {
        this.character[0][currentKey]--;
        this.updateCharacterInDatabase();
      }
    } else if (currentOrMax === 'max') {
      if (type === 0) {
        this.character[0][maxKey]++;
        this.updateCharacterInDatabase();
      } else {
        this.character[0][maxKey]--;
        this.updateCharacterInDatabase();
      }
    }
  }

  public gotoEditScreen(characterid: number) {
    this.router.navigateByUrl(`/character/edit/${characterid}`);
  }

  public gotoNotesOrAboutScreen(screen: string) {
    this.router.navigateByUrl(`/character/${screen}/${this.characterID}`);
  }

  public backToInitialScreen() {
    const notation = localStorage.getItem(`notation${this.characterID}`);
    localStorage.clear();

    localStorage.setItem(`notation${this.characterID}`, notation);

    this.router.navigate(['/home']);
  }

  public updateCharacterInDatabase() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.charactersService.updateCharacter(this.character[0]).subscribe(
        (res: any) => {
          localStorage.setItem(
            'characterInfos',
            JSON.stringify(this.character[0])
          );
        },
        (error: any) => this.generic.presentToast(error.error, 3)
      );
    }, 500);
  }

  public fnHiddenStatus(type: string) {
    const formattedType = `hidden_${type}`;
    this.hiddenStatus[formattedType] = !this.hiddenStatus[formattedType]
      ? 1
      : 0;

    this.charactersService
      .hiddenCharacterStatus(this.hiddenStatus, this.characterID)
      .subscribe(
        (res: any) => {
          localStorage.setItem(
            'hiddenStatus',
            JSON.stringify(this.hiddenStatus)
          );
        },
        (error: any) => {
          this.generic.presentToast(error.error, 3);
          this.hiddenStatus[formattedType] = !this.hiddenStatus[formattedType]
            ? 1
            : 0;
          localStorage.setItem(
            'hiddenStatus',
            JSON.stringify(this.hiddenStatus)
          );
        }
      );
  }
}
