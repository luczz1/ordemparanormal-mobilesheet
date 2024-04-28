import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { CharacterModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-characters',
  templateUrl: 'characters.page.html',
  styleUrls: ['characters.page.scss'],
})
export class CharactersPage implements ViewDidEnter, ViewDidLeave {
  public charactersList: CharacterModel[] = [];
  public filteredCharactersList: CharacterModel[] = [];

  public pageLoaded = false;

  public search = '';

  constructor(
    public router: Router,
    public modalController: ModalController,
    private characterService: CharactersService,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    this.getCharacters();
  }

  ionViewDidLeave(): void {
    this.pageLoaded = false;

    this.charactersList = [];
  }

  public getCharacters() {
    this.generic.multLoading(true);
    this.characterService.getCharacters().subscribe(
      (res) => {
        this.charactersList = res.characters;
        this.pageLoaded = true;

        this.generic.multLoading(false);
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public setLocalStorageAndEnterChar(
    charID: string | number,
    charName: string
  ) {
    localStorage.setItem('character', `${charID}`);
    localStorage.setItem('name', `${charName}`);
    this.router.navigateByUrl(`/character/${charID}`);
  }

  public filterCharacters = (ev: any) => {
    const queryLower = ev.target.value.toLowerCase();

    if (queryLower === '') {
      this.filteredCharactersList = [];
      return;
    }

    this.filteredCharactersList = this.charactersList.filter((attr) =>
      attr.name.toLowerCase().includes(queryLower)
    );
  };

  public async deleteCharacter(characterID: number, characterName: string) {
    const ok = await this.generic.alertBox(
      'ATENÇÃO',
      `Deseja mesmo excluir o(a) ${characterName}?`
    );

    if (ok) {
      this.generic.multLoading(true);
      this.characterService.deleteCharacterByID(characterID).subscribe({
        next: () => {
          this.getCharacters();
        },
        error: (err) => this.generic.presentToast(err.error, 3),
      }).add(() => this.generic.multLoading(false));
    }
  }
}
