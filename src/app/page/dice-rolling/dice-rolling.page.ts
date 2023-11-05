import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-dice-rolling',
  templateUrl: 'dice-rolling.page.html',
  styleUrls: ['dice-rolling.page.scss'],
})
export class DiceRollingPage implements ViewDidEnter {
  public characterid = 0;
  public rollname = '';
  public rollvalue = 0;
  public bonus = 0;

  public openCustomModal = false;
  public pageLoaded = false;

  public diceNumber = 0;

  public diceRolling = false;
  public diceResultTotal = 0;

  public clickedNumber = 0;

  public numberOfDice: number = 1;
  public diceResults: number[] = [];
  public charName: string | null = '';

  public attributeIsHigherOrLowerThanZero = false;
  public attrname = '';

  constructor(
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    this.diceRolling = false;
    this.diceResults = [];

    this.characterid = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
    this.rollname = String(
      this.activatedRoute.snapshot.paramMap.get('rollname')
    );

    const rollValueStr = this.activatedRoute.snapshot.paramMap
      .get('rollvalue')
      .split('&');
    this.attrname = rollValueStr[1];
    const realRollValue = rollValueStr[0];

    const numRollValue =
      this.attrname !== 'normally' ? Number(realRollValue) : 1;

    if (numRollValue <= 0) {
      this.attributeIsHigherOrLowerThanZero = true;
    }

    if (numRollValue === 0) {
      this.rollvalue = 2;
    } else if (numRollValue === -1) {
      this.rollvalue = 3;
    } else if (numRollValue < -1) {
      this.rollvalue = Math.abs(numRollValue) + 2;
    } else {
      const sum = this.attrname === 'normally' ? 0 : 1;
      this.rollvalue = Math.max(numRollValue + sum, 1);
    }

    this.bonus = Number(this.activatedRoute.snapshot.paramMap.get('bonus'));

    this.charName = localStorage.getItem('name');

    this.pageLoaded = true;

    this.rollDice(this.rollvalue);
  }

  public rollDice(numberOfDice: number | any, faces: any = 20) {
    this.numberOfDice = Number(numberOfDice);
    this.clickedNumber = 0;
    this.diceResultTotal = 0;

    if (this.numberOfDice > 100 || this.numberOfDice <= 0) {
      this.generic.presentToast('Quantidade de dados inválida', 3);
      return;
    }

    if (faces > 1000 || faces <= 0) {
      this.generic.presentToast('Número de faces inválido', 3);
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

  public getMinDiceResult(): number {
    return Math.min(...this.diceResults);
  }
}
