import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';

@Component({
  selector: 'app-character-overview',
  templateUrl: 'character-overview.page.html',
  styleUrls: ['character-overview.page.scss'],
})
export class CharacterOverviewPage implements OnInit {
  public character: CharacterModel[] = [];

  constructor(private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const characterID = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.getCharacterByID(characterID);
  }

  public getCharacterByID(id: number) {
    this.charactersService.getCharacterByID(id).subscribe(
      (res) => this.character.push(res),
      (error) => console.log(error)
    );
  }
}
