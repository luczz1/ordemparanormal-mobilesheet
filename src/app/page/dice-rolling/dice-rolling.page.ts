import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';

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

  public pageLoaded = false;

  public diceNumber = 0;

  public diceRolling = false;

  public clickedNumber = 0;

  numberOfDice: number = 1;
  diceResults: number[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

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

    this.pageLoaded = true;
  }
  rollDice(numberOfDice = 1) {
    this.numberOfDice = numberOfDice;

    this.diceRolling = true;

    let diceInterval = setInterval(() => {
      this.diceResults = [];

      for (let i = 0; i < this.numberOfDice; i++) {
        const diceNumber = Math.ceil(Math.random() * 20);
        this.diceResults.push(diceNumber);
      }
    }, 50);

    setTimeout(() => {
      clearInterval(diceInterval);
      this.diceRolling = false;
    }, 2000);
  }
}
