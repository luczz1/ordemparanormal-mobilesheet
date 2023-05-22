import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { AbilitiesListModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';

@Component({
  selector: 'app-skills-powers',
  templateUrl: 'skills-powers.page.html',
  styleUrls: ['skills-powers.page.scss'],
})
export class SkillsPowersPage implements ViewDidEnter {
  public skillsList: AbilitiesListModel[] = [];
  public powersList: AbilitiesListModel[] = [];

  public pageLoaded = false;

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ionViewDidEnter(): void {
    const characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.getSkills(characterID);
  }

  public getSkills(id: number) {
    this.charactersService.getCharacterAbilitiesListByID(id).subscribe(
      (res) => {
        this.skillsList = res.abilityList;
        this.getPowers(id);
      },
      (error) => console.log(error)
    );
  }

  public getPowers(id: number) {
    this.charactersService.getCharacterPowersListByID(id).subscribe(
      (res) => {
        this.powersList = res.powersList;
        this.pageLoaded = true;
      },
      (error) => {console.log(error); this.pageLoaded = true}
    );
  }
}
