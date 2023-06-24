import { Component, OnDestroy } from '@angular/core';
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

  public DTValue = '0';

  public proficiencyModalIsOpen = false;

  public currentAddName = '';
  public charName: string | null = '';

  public hiddenAbilities = false;
  public hiddenRituals = false;

  public proficiences = {
    id: 0,
    simple_weapon: 0,
    tactical_weapon: 0,
    heavy_weapon: 0,
    light_armor: 0,
    heavy_armor: 0,
    character_id: 0,
  };

  public newSkill = {
    name: '',
    description: '',
  };

  public newPower = {
    name: '',
    description: '',
    price: '',
    pages: '',
    element: '',
    circle: 0,
    target: '',
    duration: '',
    resistance: '',
    execution: 0,
    reach: 0,
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

    if (localStorage.getItem('ritualsDT')) {
      this.DTValue = localStorage.getItem('ritualsDT');
    }

    if (
      localStorage.getItem('skillsList') &&
      localStorage.getItem('powersList')
    ) {
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
        localStorage.setItem(
          'skillsList',
          JSON.stringify(res.abilities) ?? '[]'
        );
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
        if (res.powers) {
          res.powers.forEach((item) => {
            if (item.element) {
              item.element = JSON.parse(item.element);
            }
          });
        }

        this.powersList = res.powers;

        localStorage.setItem('powersList', JSON.stringify(res.powers) ?? '[]');
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
    };

    this.newPower = {
      name: '',
      description: '',
      price: '',
      pages: '',
      element: '',
      circle: 0,
      target: '',
      duration: '',
      resistance: '',
      execution: 0,
      reach: 0,
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
              element: '',
              circle: 0,
              target: '',
              duration: '',
              resistance: '',
              execution: 0,
              reach: 0,
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

  public saveDT() {
    if (
      Number(this.DTValue) <= 0 ||
      (!this.DTValue && localStorage.getItem('DT'))
    ) {
      localStorage.removeItem('ritualsDT');
      return;
    }
    localStorage.setItem('ritualsDT', this.DTValue);
  }

  public getProciciences(openModal = true) {
    if (localStorage.getItem('proficiences')) {
      this.proficiences = JSON.parse(localStorage.getItem('proficiences'));
      this.proficiencyModalIsOpen = openModal;
      return;
    }

    this.generic.multLoading(true);

    this.charactersService
      .getCharacterProficiences(this.characterId)
      .subscribe({
        next: (res) => {
          this.proficiences = res[0];
          this.proficiencyModalIsOpen = openModal;
          localStorage.setItem(
            'proficiences',
            JSON.stringify(this.proficiences)
          );
          this.generic.multLoading(false);
        },
        error: (err) => {
          this.generic.presentToast(err, 3);
          this.generic.multLoading(false);
        },
      });
  }

  public editProficiences() {
    const storageObj = JSON.parse(localStorage.getItem('proficiences'));
    const storageObjString = JSON.stringify(storageObj);
    const proficiencesString = JSON.stringify(this.proficiences);

    if (proficiencesString !== storageObjString) {
      this.charactersService
        .editCharacterProficiences(this.proficiences)
        .subscribe({
          next: () => {
            localStorage.removeItem('proficiences');
            this.getProciciences(false);
          },
          error: (err) => {
            this.generic.presentToast(err, 3);
          },
        });
    }
  }
}
