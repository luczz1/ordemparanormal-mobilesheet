import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
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
  public pageLoaded = false;

  constructor(
    public router: Router,
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
    this.generic.multLoading(true, false);
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

  public async deleteCharacter(characterID: number, characterName: string) {
    const ok = await this.generic.alertBox(
      'ATENÇÃO',
      `Deseja mesmo excluir o(a) ${characterName}?`
    );

    if (ok) {
      this.characterService.deleteCharacterByID(characterID).subscribe({
        next: () => {
          this.getCharacters();
        },
        error: (err) => this.generic.presentToast(err.error, 3),
      });
    }
  }
}
