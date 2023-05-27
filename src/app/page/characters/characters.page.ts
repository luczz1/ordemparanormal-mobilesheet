import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { CharacterModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-characters',
  templateUrl: 'characters.page.html',
  styleUrls: ['characters.page.scss'],
})
export class CharactersPage implements ViewDidEnter {
  public charactersList: CharacterModel[] = [];

  constructor(
    public router: Router,
    private characterService: CharactersService,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    this.getCharacters();
  }

  public getCharacters() {
    this.generic.multLoading(true);
    this.characterService.getCharacters().subscribe(
      (res) => {
        this.charactersList = res.characters;
        this.generic.multLoading(false);
      },
      (error) => {
        console.log(error);
        this.generic.multLoading(false);
      }
    );
  }

  public setLocalStorageAndEnterChar(charID: string | number) {
    localStorage.setItem('character', `${charID}`);
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
        error: (err) => console.log(err),
      });
    }
  }
}
