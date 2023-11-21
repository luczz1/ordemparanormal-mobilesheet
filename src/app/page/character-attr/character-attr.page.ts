import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
} from '@angular/core';
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
  public timeoutTrainingId: ReturnType<typeof setTimeout> | null = null;

  public pageWidth = 0;
  public currentSkillTrainingLevel = 0;

  public attrForm = new FormGroup({
    id: new FormControl(0),
    agility: new FormControl(0),
    strength: new FormControl(0),
    intellect: new FormControl(0),
    stamina: new FormControl(0),
    presence: new FormControl(0),
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.pageWidth = event.target.innerWidth;
  }

  ionViewDidEnter() {
    const characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.pageWidth = window.innerWidth;

    this.characterID = characterID;
    this.charName = localStorage.getItem('name');

    if (localStorage.getItem('attr') && localStorage.getItem('skills')) {
      this.attrForm.patchValue(JSON.parse(localStorage.getItem('attr')));
      this.skills = JSON.parse(localStorage.getItem('skills'));

      this.skills.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.skills.sort((a, b) => (a.favorite > b.favorite ? -1 : 1));

      this.pageLoaded = true;
    } else {
      if (localStorage.getItem('loaded')) {
        this.generic.multLoading(true);
      }

      this.getCharacterAttributes(characterID);
    }
  }

  ionViewDidLeave() {
    this.pageLoaded = false;
  }

  public getCharacterAttributes(id: number, getSkills = true) {
    this.charactersService.getCharacterAttributesByID(id).subscribe(
      (res) => {
        localStorage.setItem('attr', JSON.stringify(res.attributes));
        this.attrForm.patchValue(res.attributes);
        if (getSkills) {
          this.getCharacterSkills(id);
        }
        this.cdr.detectChanges();
      },
      (error) => this.generic.presentToast(error.error, 3)
    );
  }

  public getCharacterSkills(id: number) {
    this.charactersService.getCharacterSkillsByID(id).subscribe(
      (res) => {
        this.skills = res.skills;
        localStorage.setItem('skills', JSON.stringify(res.skills));

        this.skills.sort((a, b) => (a.name > b.name ? 1 : -1));
        this.skills.sort((a, b) => (a.favorite > b.favorite ? -1 : 1));

        this.pageLoaded = true;
        if (localStorage.getItem('loaded')) {
          this.generic.multLoading(false);
        }
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

    if (this.numberOfDice > 100 || this.numberOfDice <= 0) {
      this.generic.presentToast('Quantidade de dados inválida', 3);
      return;
    }

    if (faces > 1000 || faces <= 0) {
      this.generic.presentToast('Número de faces inválido', 3);
      return;
    }

    const audio = new Audio('/assets/sound/dice-roll.mp3');
    audio.play();

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
    }, 600);
  }

  public openModalAndSaveSkill(
    skillname: string,
    skillvalue: number,
    id: number,
    trainingLvl: number
  ) {
    this.selectedSkill = skillname;
    this.skillValue = skillvalue;
    this.skillID = id;
    this.currentSkillTrainingLevel = trainingLvl;
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
            if (attribute === 'agility') {
              localStorage.removeItem('totalDefense');
              localStorage.setItem('totalDefense', String(10 + Number(value)));
            } else if (attribute === 'stamina' || attribute === 'presence') {
              localStorage.setItem('updatedChar', 'true');
              if (attribute === 'presence') {localStorage.setItem('ritualsDT',  String(10 + Number(value)))}
            }
            this.getCharacterAttributes(this.characterID, false);
          },
          error: (err) => this.generic.presentToast(err.error, 3),
        });

      this.timeoutId = null;
    }, 500);
  }

  public increaseOrDecreaseSkill(type: number | string) {
    if (type === 0) this.skillValue--;
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

  public selectTraining(ev: any) {
    const trainingLvl = ev.detail.value;
    this.skillValue = trainingLvl;

    if (this.timeoutTrainingId !== null) {
      clearTimeout(this.timeoutTrainingId);
    }

    this.timeoutTrainingId = setTimeout(() => {
      this.charactersService
        .updateTrainingSkillValue(this.characterID, this.skillID, trainingLvl)
        .subscribe({
          next: () => {
            setTimeout(() => {
              this.getCharacterSkills(this.characterID);
            }, 50);
          },
          error: (err) => this.generic.presentToast(err.error, 3),
        });

      this.timeoutTrainingId = null;
    }, 500);
  }

  public favoriteSkill(id: number, favorite: number) {
    let favoriteVal = favorite === 0 ? 1 : 0;
    this.charactersService.favoriteSkill(id, favoriteVal).subscribe(
      (res) => {
        this.getCharacterSkills(this.characterID);
      },
      (error) => this.generic.presentToast(error.error, 3)
    );
  }

  public redirectToPage(
    skillName: string,
    skillValue: number,
    rollType: string
  ) {
    const attrValue = this.attrForm.get(rollType)?.value;
    const url = `/character/dice-rolling/${this.characterID}/${skillName}/${attrValue}&${rollType}/${skillValue}`;
    this.router.navigateByUrl(url);
  }

  public gotoDiceRolling(
    skillName: string,
    skillValue: number | string,
    bonus: number
  ) {
    this.router.navigateByUrl(
      `/character/dice-rolling/${this.characterID}/${skillName}/${skillValue}&nAttr/${bonus}`
    );
  }
}
