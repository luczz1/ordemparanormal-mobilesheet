import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { AbilitiesListModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-skills-powers',
  templateUrl: 'skills-powers.page.html',
  styleUrls: ['skills-powers.page.scss'],
})
export class SkillsPowersPage implements ViewDidEnter, ViewDidLeave {
  public skillsList: AbilitiesListModel[] = [];
  public powersList: AbilitiesListModel[] = [];

  public pageLoaded = false;
  public openStatusModal = false;
  public characterId = 0;

  public currentAddName = '';
  public charName: string | null = '';

  public newSkill = {
    name: '',
    description: '',
    price: '',
    pages: '',
  };

  public newPower = {
    name: '',
    description: '',
    price: '',
    pages: '',
  };

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    const characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.characterId = characterID;

    this.charName = localStorage.getItem('name');

    if (localStorage.getItem('skillsList')) {
      this.skillsList = JSON.parse(localStorage.getItem('skillsList'));
      this.powersList = JSON.parse(localStorage.getItem('powersList'));

      this.pageLoaded = true;
    } else {
      this.generic.multLoading(true);
      this.getSkill(characterID);
    }
  }

  ionViewDidLeave() {
      this.pageLoaded = false;
  }

  public getSkill(id: number) {
    this.charactersService.getCharacterAbilitiesListByID(id).subscribe(
      (res) => {
        this.skillsList = res.abilities;
        localStorage.setItem('skillsList', JSON.stringify(res.abilities));
        this.getPower(id);
      },
      (error) => {
        this.generic.presentToast(error.error, 3),
          this.generic.multLoading(false);
      }
    );
  }

  public getPower(id: number) {
    this.charactersService.getCharacterPowersListByID(id).subscribe(
      (res) => {
        this.powersList = res.powers;
        localStorage.setItem('powersList', JSON.stringify(res.powers));
        this.pageLoaded = true;
        this.generic.multLoading(false);
      },
      (error) => {
        this.generic.multLoading(false);
        this.pageLoaded = true;
      }
    );
  }

  public openSkillOrPowerModal(type: string) {
    this.newSkill = {
      name: '',
      description: '',
      price: '',
      pages: '',
    };

    this.newPower = {
      name: '',
      description: '',
      price: '',
      pages: '',
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
    if (this.newSkill.name) {
      this.charactersService
        .updateCharacterAbilitiesList(this.characterId, this.newSkill)
        .subscribe(
          () => {
            this.newSkill = {
              name: '',
              description: '',
              price: '',
              pages: '',
            };

            this.openStatusModal = false;
            this.getSkill(this.characterId);
          },
          (error: any) => {
            this.generic.presentToast(error.error, 3);
          }
        );
    } else {
      this.generic.presentToast('O nome é obrigatório.', 3);
    }
  }

  public addPower() {
    if (this.newPower.name) {
      this.charactersService
        .updateCharacterPowersList(this.characterId, this.newPower)
        .subscribe(
          (res) => {
            this.newPower = {
              name: '',
              description: '',
              price: '',
              pages: '',
            };

            this.openStatusModal = false;
            this.getPower(this.characterId);
          },
          (error: any) => {
            this.generic.presentToast(error.error, 3);
          }
        );
    } else {
      this.generic.presentToast('O nome é obrigatório.', 3);
    }
  }

  public async deleteItem(type: string, itemid: number, itemname: string) {
    const functionName = `deleteCharacter` + type;
    const getName = `get` + type;

    const ok = await this.generic.alertBox(
      'ATENÇÃO',
      `Deseja mesmo excluir ${
        type === 'Skill' ? `a habilidade ${itemname}` : `o ritual ${itemname}`
      }?`
    );

    if (ok) {
      this.charactersService[functionName](this.characterId, itemid).subscribe(
        (res: any) => {
          this[getName](this.characterId);
        }
      );
    }
  }
}
