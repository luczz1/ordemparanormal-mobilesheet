import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter } from '@ionic/angular';

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

  constructor(private activatedRoute: ActivatedRoute, public modalController: ModalController) {}

  ionViewDidEnter(): void {
    this.diceRolling = false;
    this.diceResults = [];

    this.characterid = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
    this.rollname = String(
      this.activatedRoute.snapshot.paramMap.get('rollname')
    );
    this.rollvalue = Number(
      this.activatedRoute.snapshot.paramMap.get('rollvalue')
    ) + 1;
    this.bonus = Number(this.activatedRoute.snapshot.paramMap.get('bonus'));

    this.charName = localStorage.getItem('name');

    this.pageLoaded = true;
  }

  public rollDice(numberOfDice: number | any, faces: any = 20) {
    this.numberOfDice = Number(numberOfDice);
    this.clickedNumber = 0;
    this.diceResultTotal = 0;

    if (this.numberOfDice > 100 || this.numberOfDice <= 0) {
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
}
