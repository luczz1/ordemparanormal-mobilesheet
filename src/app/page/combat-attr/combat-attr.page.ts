import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { AttackModel, DefenseModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-combat-attr',
  templateUrl: 'combat-attr.page.html',
  styleUrls: ['combat-attr.page.scss'],
})
export class CombatAttrPage implements ViewDidEnter, ViewDidLeave {
  public characterID = 0;
  public charName: string | null = '';

  public attacksList: AttackModel[] = [];
  public defensesList: DefenseModel[] = [];
  public totalDefense = 0;

  public pageLoaded = false;
  public openStatusModal = false;

  public protectionValue = '';

  public defenseMode = false;

  public editingMode = false;

  public selectedDefenseID = 0;

  public numberOfDice: number = 1;
  public diceResults: number[] = [];
  public diceRolling = false;

  public openDiceRollModal = false;

  public diceResultTotal = 0;
  public timeoutId: ReturnType<typeof setTimeout> | null = null;

  public faces = 0;
  public modifier = 0;

  public attacksForm: any = new FormGroup({
    id: new FormControl(0),
    attack_name: new FormControl('', [Validators.required]),
    test: new FormControl(''),
    damage: new FormControl('', [Validators.required]),
    critical_or_range_or_special: new FormControl(''),
  });

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    const characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
    this.characterID = characterID;

    if (
      localStorage.getItem('defensesList') &&
      localStorage.getItem('attacksList') &&
      localStorage.getItem('totalDefense')
    ) {
      this.defensesList = JSON.parse(localStorage.getItem('defensesList'));
      this.attacksList = JSON.parse(localStorage.getItem('attacksList'));

      this.totalDefense = Number(localStorage.getItem('totalDefense'));

      this.pageLoaded = true;
    } else {
      if (localStorage.getItem('loaded')) {
        this.generic.multLoading(true);
      }
      this.getTotalDefense();
    }

    this.charName = localStorage.getItem('name');
  }

  ionViewDidLeave() {
    this.pageLoaded = false;
  }

  public getTotalDefense(call = true) {
    this.charactersService.getCharacterTotalDefense(this.characterID).subscribe(
      (res) => {
        this.totalDefense = res[0].defense_total;
        localStorage.setItem('totalDefense', res[0].defense_total);

        if (call) this.getDefenses();
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public editTotalDefense() {
    this.charactersService
      .editCharacterTotalDefense(this.characterID, this.totalDefense)
      .subscribe({
        next: () => this.getTotalDefense(false),
        error: (err) => this.generic.presentToast(err.error, 3),
      });
  }

  public getDefenses(getAtt = true) {
    this.charactersService.getCharacterDefenses(this.characterID).subscribe(
      (res) => {
        if (typeof res !== 'string') {
          this.defensesList = res;
          localStorage.setItem('defensesList', JSON.stringify(res));
        } else {
          this.defensesList = [];
          localStorage.setItem('defensesList', '[]');
        }

        if (getAtt) this.getAttacks();
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public addDefenses() {
    if (!this.protectionValue) {
      this.generic.presentToast('O campo não pode ser vazio.', 3);
      return;
    }

    this.charactersService
      .addCharacterDefenses(this.characterID, this.protectionValue)
      .subscribe(
        (res) => {
          this.getDefenses(false);
          this.openStatusModal = false;
        },
        (error) => {
          this.generic.presentToast(error.error, 3);
        }
      );
  }

  public async deleteDefense(defenseID: number, defenseName: string) {
    const ok = await this.generic.alertBox(
      'ATENÇÃO',
      `Deseja mesmo excluir ${defenseName}?`
    );

    if (ok) {
      this.charactersService.deleteCharacterDefenses(defenseID).subscribe({
        next: () => this.getDefenses(false),
        error: (err) => this.generic.presentToast(err.error, 3),
      });
    }
  }

  public getAttacks() {
    this.charactersService.getCharacterAttacks(this.characterID).subscribe(
      (res) => {
        if (typeof res !== 'string') {
          this.attacksList = res;
          localStorage.setItem('attacksList', JSON.stringify(res));
        } else {
          this.attacksList = [];
          localStorage.setItem('attacksList', '[]');
        }
        if (localStorage.getItem('loaded')) {
          this.generic.multLoading(false);
        }

        this.pageLoaded = true;
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public getAttackByID(attackID: number) {
    this.editingMode = true;
    this.defenseMode = false;

    this.generic.multLoading(true);

    this.charactersService.getCharacterAttackByID(attackID).subscribe(
      (res) => {
        this.attacksForm.patchValue(res[0]);

        this.generic.multLoading(false);
        this.openStatusModal = true;
      },
      (error) => {
        this.generic.multLoading(true);
        this.generic.presentToast(error.error, 3);
      }
    );
  }

  public getDefenseByID(defenseID: number) {
    this.editingMode = true;
    this.defenseMode = true;

    this.generic.multLoading(true);

    this.charactersService.getCharacterDefenseByID(defenseID).subscribe(
      (res) => {
        this.protectionValue = res[0].protection;
        this.selectedDefenseID = res[0].id;

        this.generic.multLoading(false);
        this.openStatusModal = true;
      },
      (error) => {
        this.generic.multLoading(false);
        this.generic.presentToast(error.error, 3);
      }
    );
  }

  public addAttacks() {
    if (this.attacksForm.valid) {
      const obj = this.attacksForm.getRawValue();

      this.charactersService
        .addCharacterAttacks(this.characterID, obj)
        .subscribe(
          (res) => {
            this.getAttacks();
            this.openStatusModal = false;
          },
          (error) => {
            this.generic.presentToast(error.error, 3);
          }
        );
    } else {
      this.generic.presentToast('Há dados incorretos no formulário.', 3);
    }
  }

  public editAttack() {
    if (this.attacksForm.valid) {
      const obj = this.attacksForm.getRawValue();

      this.charactersService.editCharacterAttack(obj.id, obj).subscribe(
        (res) => {
          this.getAttacks();
          this.openStatusModal = false;
        },
        (error) => {
          this.openStatusModal = false;

          this.generic.presentToast(error.error, 3);
        }
      );
    } else {
      this.generic.presentToast('Há dados incorretos no formulário.', 3);
    }
  }

  public editDefense() {
    if (this.protectionValue) {
      this.charactersService
        .editCharacterDefenses(this.selectedDefenseID, this.protectionValue)
        .subscribe(
          (res) => {
            this.getDefenses(false);
            this.openStatusModal = false;
          },
          (error) => {
            this.openStatusModal = false;

            this.generic.presentToast(error.error, 3);
          }
        );
    } else {
      this.generic.presentToast('O campo não pode ser vazio..', 3);
    }
  }

  public async deleteAttack(attackID: number, attackName: string) {
    const ok = await this.generic.alertBox(
      'ATENÇÃO',
      `Deseja mesmo excluir o ataque ${attackName}?`
    );

    if (ok) {
      this.charactersService.deleteCharacterAttacks(attackID).subscribe({
        next: () => this.getAttacks(),
        error: (err) => this.generic.presentToast(err.error, 3),
      });
    }
  }

  rollDice(value: string) {
    const sanitizedValue = value.replace(/\s/g, '');

    const matchSingleDice = sanitizedValue.match(/^d(\d+)$/);
    if (matchSingleDice) {
        this.numberOfDice = 1;
        this.faces = parseInt(matchSingleDice[1]);
        this.diceResultTotal = 0;
        this.modifier = 0;
        this.diceRoll();
        return;
    }

    const match = sanitizedValue.match(/^(\d*)d(\d+)(\+(\d+))?/);
    if (!match) {
        this.generic.presentToast('Formato de dados inválido', 3);
        return;
    }

    this.numberOfDice = match[1] ? parseInt(match[1]) : 1;
    this.faces = parseInt(match[2]);
    this.diceResultTotal = 0;
    this.modifier = match[4] ? parseInt(match[4]) : 0;

    this.diceRoll();
}

  diceRoll() {
    if (this.numberOfDice > 100 || this.numberOfDice <= 0) {
      this.generic.presentToast('Quantidade de dados inválida', 3);
      return;
    }

    if (this.faces > 1000 || this.faces <= 0) {
      this.generic.presentToast('Número de faces inválido', 3);
      return;
    }

    this.openDiceRollModal = true;

    const audio = new Audio('/assets/sound/dice-roll.mp3');
    audio.play();

    this.diceRolling = true;

    let diceInterval = setInterval(() => {
      this.diceResults = [];

      for (let i = 0; i < this.numberOfDice; i++) {
        const diceNumber = Math.ceil(Math.random() * this.faces);
        this.diceResults.push(diceNumber);
      }
    }, 50);

    setTimeout(() => {
      clearInterval(diceInterval);
      this.diceRolling = false;

      this.diceResults.forEach((dice) => (this.diceResultTotal += dice));
    }, 600);
  }
}
