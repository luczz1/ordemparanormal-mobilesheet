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
  public hiddenRituals = true;

  public expandedItems: { [key: number]: boolean } = {};
  public maxLength: number = 65;

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
    id: 0,
    name: '',
    description: '',
    page: '',
  };

  public newPower = {
    id: 0,
    name: '',
    description: '',
    price: '',
    page: '',
    element: '',
    circle: 0,
    target: '',
    duration: '',
    resistance: '',
    execution: 0,
    reach: 0,
  };

  public editingMode = false;

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
    this.hiddenAbilities = false;
    this.hiddenRituals = true;

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
      if (localStorage.getItem('loaded')) {
        this.generic.multLoading(true);
      }
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
        if (localStorage.getItem('loaded')) {
          this.generic.multLoading(false);
        }
      },
      (error) => {
        this.generic.multLoading(false);
        this.pageLoaded = true;
      }
    );
  }

  public openSkillOrPowerModal(type: string) {
    this.clearItems();

    this.currentAddName = type;
    this.editingMode = false;
    this.openStatusModal = true;
  }

  public addSkillOrPower(type: string) {
    if (type === 'skill') {
      this.addSkill();
    } else if (type === 'power') {
      this.addPower();
    }
  }

  public updateAbilityOrRitual(type: string, id: number) {
    if (type === 'skill') {
      this.updateAbility(id);
    } else if (type === 'power') {
      this.updateRitual(id);
    }
  }

  public addSkill() {
    if (this.newSkill.name) {
      this.charactersService
        .updateCharacterAbilitiesList(this.characterId, this.newSkill)
        .subscribe(
          () => {
            this.clearItems();

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
            this.clearItems();

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

  public updateAbility(id: number) {
    if (this.newSkill.name) {
      this.charactersService
        .updateCharacterAbility(id, this.newSkill)
        .subscribe(
          () => {
            this.clearItems();

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

  public updateRitual(id: number) {
    if (this.newPower.name) {
      this.charactersService.updateCharacterRitual(id, this.newPower).subscribe(
        (res) => {
          this.clearItems();

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

    this.charactersService
      .updateCharacterRitualDT(this.characterId, Number(this.DTValue))
      .subscribe({
        next: () => {
          localStorage.setItem('ritualsDT', this.DTValue);
        },
        error: (err) => {
          this.generic.presentToast(err.error, 3);
        },
      });
  }

  public getPowerOrAbilityByID(id: number, type: number) {
    this.generic.multLoading(true);

    const list = type === 0 ? 'newSkill' : 'newPower';
    const endpoint = type === 0 ? 'getAbilityByID' : 'getPowerByID';

    this.editingMode = true;

    this.charactersService[endpoint](id).subscribe({
      next: (res) => {
        if (res.element) {
          res.element = JSON.parse(res.element);
        }

        this[list] = res;
        this.currentAddName = type === 0 ? 'skill' : 'power';

        this.openStatusModal = true;
        this.generic.multLoading(false);
      },
    });
  }

  public getProficiences(openModalOrStartLoading = true) {
    if (localStorage.getItem('proficiences')) {
      this.proficiences = JSON.parse(localStorage.getItem('proficiences'));
      this.proficiencyModalIsOpen = openModalOrStartLoading;
      return;
    }

    this.generic.multLoading(openModalOrStartLoading);

    this.charactersService
      .getCharacterProficiences(this.characterId)
      .subscribe({
        next: (res) => {
          this.proficiences = res[0];
          this.proficiencyModalIsOpen = openModalOrStartLoading;
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
            this.getProficiences(false);
          },
          error: (err) => {
            this.generic.presentToast(err, 3);
          },
        });
    }
  }

  public toggleReadMore(itemId: number) {
    this.expandedItems[itemId] = !this.expandedItems[itemId];
  }

  private clearItems() {
    this.newSkill = {
      id: 0,
      name: '',
      description: '',
      page: '',
    };

    this.newPower = {
      id: 0,
      name: '',
      description: '',
      price: '',
      page: '',
      element: '',
      circle: 0,
      target: '',
      duration: '',
      resistance: '',
      execution: 0,
      reach: 0,
    };
  }
}
