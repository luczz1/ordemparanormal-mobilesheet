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

  public timeoutId: ReturnType<typeof setTimeout> | null = null;

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
    this.generic.multLoading(true);

    const characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
    this.characterID = characterID;

    this.getTotalDefense();
    this.charName = localStorage.getItem('name');
  }

  ionViewDidLeave(): void {
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
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      if (this.totalDefense) {
        this.charactersService
          .editCharacterTotalDefense(this.characterID, this.totalDefense)
          .subscribe({
            next: () => this.getTotalDefense(false),
            error: (err) => this.generic.presentToast(err.error, 3),
          });
      }
    }, 500);
  }

  public getDefenses(getAtt = true) {
    this.charactersService.getCharacterDefenses(this.characterID).subscribe(
      (res) => {
        if (typeof res !== 'string') {
        this.defensesList = res;
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
