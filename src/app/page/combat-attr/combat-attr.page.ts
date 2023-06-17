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


    if (localStorage.getItem('defensesList')) {
      this.defensesList = JSON.parse(localStorage.getItem('defensesList'));
      this.attacksList = JSON.parse(localStorage.getItem('attacksList'));

      this.pageLoaded = true;
      this.getTotalDefense(false);
    } else {
      this.generic.multLoading(true);
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
        }
        this.generic.multLoading(false);

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

    this.charactersService.getCharacterAttackByID(attackID).subscribe(
      (res) => {
        this.attacksForm.patchValue(res[0]);

        this.openStatusModal = true;
      },
      (error) => {
        this.generic.presentToast(error.error, 3);
      }
    );
  }

  public getDefenseByID(defenseID: number) {
    this.editingMode = true;
    this.defenseMode = true;

    this.charactersService.getCharacterDefenseByID(defenseID).subscribe(
      (res) => {
        this.protectionValue = res[0].protection;
        this.selectedDefenseID = res[0].id;

        this.openStatusModal = true;
      },
      (error) => {
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
}
