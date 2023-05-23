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
  public openStatusModal = false;
  public characterId = 0;

  public currentAddName = '';

  public newSkill = {
    name: '',
    description: '',
  };

  public newPower = {
    name: '',
    description: '',
  };

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ionViewDidEnter(): void {
    const characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.characterId = characterID;

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
      (error) => {
        console.log(error);
        this.pageLoaded = true;
      }
    );
  }

  public openSkillOrPowerModal(type: string) {
    this.newSkill = {
      name: '',
      description: '',
    };

    this.newPower = {
      name: '',
      description: '',
    };

    this.currentAddName = type;
    this.openStatusModal = true;
  }

  public addSkillOrPower(type: string) {
    if (type === 'skill') {
      this.addSkill();
    } else if (type === 'power') {
      this.addPower();
    }
  }

  public addSkill() {
    this.charactersService
      .updateCharacterAbilitiesList(this.characterId, this.newSkill)
      .subscribe(
        () => {
          this.openStatusModal = false;
          this.newSkill = {
            name: '',
            description: '',
          };

          setTimeout(() => {
            this.getSkills(this.characterId);
          }, 200);
        },
        (error: any) => {
          console.error('Erro ao adicionar habilidade:', error);
        }
      );
  }

  public addPower() {
    this.charactersService
      .updateCharacterPowersList(this.characterId, this.newPower)
      .subscribe(
        (res) => {
          this.openStatusModal = false;
          this.newPower = {
            name: '',
            description: '',
          };

          setTimeout(() => {
            this.getPowers(this.characterId);
          }, 200);
        },
        (error: any) => {
          console.error('Erro ao adicionar poder:', error);
        }
      );
  }
}
