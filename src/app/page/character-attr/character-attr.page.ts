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

  public attrForm = new FormGroup({
    id: new FormControl(0),
    agility: new FormControl(0),
    strength: new FormControl(0),
    intellect: new FormControl(0),
    force: new FormControl(0),
    presence: new FormControl(0),
    normally: new FormControl(0),
  });

  showModal = false;
  selectedSkill: any;

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
        this.attrForm.patchValue(res);
        this.getCharacterSkills(id);
        this.cdr.detectChanges();
      },
      (error) => console.log(error)
    );
  }

  public getCharacterSkills(id: number) {
    this.charactersService.getCharacterSkillsByID(id).subscribe(
      (res) => {
        this.skills = res.skills;

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
    if (data.rollValue !== '') {
      this.redirectToPage(skill.name, skill.value, data.rollValue);
    }
  }

  public rollDice(numberOfDice: number | any, faces: any = 20) {
    this.numberOfDice = Number(numberOfDice);

    if (this.numberOfDice > 20 || this.numberOfDice <= 0) {
      alert('Quantidade de dados inválida.')
      return;
    }

    if (faces > 100 || faces <= 0) {
      alert('Número de faces inválido.')
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
    }, 2000);
  }

  redirectToPage(skillName: string, skillValue: number, rollType: string) {
    const attrValue = this.attrForm.get(rollType)?.value;
    const url = `/character/dice-rolling/1/${skillName}/${attrValue}/${skillValue}`;
    this.router.navigateByUrl(url);
  }
}
