import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter, ModalController, ViewDidLeave } from '@ionic/angular';
import {
  CharacterAttributesModel,
  CharacterSkillsModel,
} from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { RollQuestionComponent } from './roll-question.component';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-character-attr',
  templateUrl: 'character-attr.page.html',
  styleUrls: ['character-attr.page.scss'],
})
export class CharacterAttrPage implements ViewDidEnter, ViewDidLeave {
  public attributes: CharacterAttributesModel[] = [];
  public skills: CharacterSkillsModel[] = [];

  public pageLoaded = false;

  public numberOfDice: number = 1;
  public diceResults: number[] = [];
  public diceRolling = false;

  public editingMode = false;
  public openStatusModal = false;

  public characterID = 0;
  public diceResultTotal = 0;
  public timeoutId: ReturnType<typeof setTimeout> | null = null;

  public attrForm = new FormGroup({
    id: new FormControl(0),
    agility: new FormControl(0),
    strength: new FormControl(0),
    intellect: new FormControl(0),
    stamina: new FormControl(0),
    presence: new FormControl(0),
    normally: new FormControl(0),
  });

  public showModal = false;
  public selectedSkill: string = '';
  public skillValue = 0;
  public skillID = 0;
  public charName: string | null = '';

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public modalController: ModalController,
    private generic: GenericService
  ) {}

  ionViewDidEnter() {
    const characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.characterID = characterID;
    this.charName = localStorage.getItem('name');

    this.generic.multLoading(true);

    this.getCharacterAttributes(characterID);
  }

  ionViewDidLeave(): void {
    this.attributes = [];
    this.skills = [];

    this.pageLoaded = false;
  }

  public getCharacterAttributes(id: number) {
    this.charactersService.getCharacterAttributesByID(id).subscribe(
      (res) => {
        this.attrForm.patchValue(res.attributes);
        this.getCharacterSkills(id);
        this.cdr.detectChanges();
      },
      (error) => this.generic.presentToast(error.error, 3)
    );
  }

  public getCharacterSkills(id: number) {
    this.charactersService.getCharacterSkillsByID(id).subscribe(
      (res) => {
        this.skills = res.skills;

        this.skills.sort((a, b) => (a.name > b.name ? 1 : -1));

        this.pageLoaded = true;
        this.generic.multLoading(false);
        this.cdr.detectChanges();
      },
      (error) => this.generic.multLoading(false)
    );
  }
  async openModal(skill: any) {
    const modal = await this.modalController.create({
      component: RollQuestionComponent,
      componentProps: {
        skill: skill,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.rollValue !== '') {
      this.redirectToPage(skill.name, skill.value, data.rollValue);
    }
  }

  public rollDice(numberOfDice: number | any, faces: any = 20) {
    this.numberOfDice = Number(numberOfDice);
    this.diceResultTotal = 0;

    if (this.numberOfDice > 20 || this.numberOfDice <= 0) {
      this.generic.presentToast('Quantidade de dados inválida', 3)
      return;
    }

    if (faces > 100 || faces <= 0) {
      this.generic.presentToast('Número de faces inválido', 3)
      return;
    }

    this.diceRolling = true;

    let diceInterval = setInterval(() => {
      this.diceResults = [];

      for (let i = 0; i < this.numberOfDice; i++) {
        const diceNumber = Math.ceil(Math.random() * faces);
        this.diceResults.push(diceNumber);
      }
    }, 50);

    setTimeout(() => {
      clearInterval(diceInterval);
      this.diceRolling = false;

      this.diceResults.forEach((dice) => (this.diceResultTotal += dice));
    }, 2000);
  }

  public openModalAndSaveSkill(
    skillname: string,
    skillvalue: number,
    id: number
  ) {
    this.selectedSkill = skillname;
    this.skillValue = skillvalue;
    this.skillID = id;
    this.openStatusModal = true;
  }

  public changeAttributeValue(attribute: string, value: number | string) {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.charactersService
        .updateAttributeValue(this.characterID, attribute, Number(value))
        .subscribe({
          next: () => {
            this.getCharacterAttributes(this.characterID);
          },
          error: (err) => this.generic.presentToast(err.error, 3),
        });

      this.timeoutId = null;
    }, 1000);
  }

  public increaseOrDecreaseSkill(type: number | string) {
    if (type === 0 && this.skillValue > 0) this.skillValue--;
    else this.skillValue++;

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.charactersService
        .updateSkillValue(this.characterID, this.skillID, this.skillValue)
        .subscribe({
          next: () => {
            setTimeout(() => {
              this.getCharacterSkills(this.characterID);
            }, 50);
          },
          error: (err) => this.generic.presentToast(err.error, 3),
        });

      this.timeoutId = null;
    }, 500);
  }

  public redirectToPage(
    skillName: string,
    skillValue: number,
    rollType: string
  ) {
    const attrValue = this.attrForm.get(rollType)?.value;
    const url = `/character/dice-rolling/${this.characterID}/${skillName}/${attrValue}/${skillValue}`;
    this.router.navigateByUrl(url);
  }

  public gotoDiceRolling(
    skillName: string,
    skillValue: number | string,
    bonus: number
  ) {
    this.router.navigateByUrl(
      `/character/dice-rolling/${this.characterID}/${skillName}/${skillValue}/${bonus}`
    );
  }
}
