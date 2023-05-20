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
  public secondDiceNumber = 0;

  public diceRolling = false;

  public doubleDice = false;

  public advantageRolling = false;
  public disavantageRolling = false;

  public returnMessage = 'Sucesso Extremo';

  constructor(private activatedRoute: ActivatedRoute) {}

  ionViewDidEnter(): void {
    this.characterid = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
    this.rollname = String(
      this.activatedRoute.snapshot.paramMap.get('rollname')
    );
    this.rollvalue = Number(
      this.activatedRoute.snapshot.paramMap.get('rollvalue')
    );
    this.bonus = Number(this.activatedRoute.snapshot.paramMap.get('bonus'));

    this.pageLoaded = true;
  }

  rollDice(disadvantage = false, advantage = false) {
    // this['advantageRolling', 'disavantageRolling'] = [advantage, disadvantage];
    this.advantageRolling = advantage;
    this.disavantageRolling = disadvantage;

    if (disadvantage || advantage) {
      this.doubleDice = true;
    } else {
      this.doubleDice = false;
    }

    this.diceRolling = true;

    let diceInterval = setInterval(() => {
      this.diceNumber = Math.ceil(Math.random() * (20 - 1) + 1);
      if (disadvantage || advantage) {
        this.secondDiceNumber = Math.ceil(Math.random() * (20 - 1) + 1);
      }
    }, 50);

    setTimeout(() => {
      clearInterval(diceInterval);
      this.diceRolling = false;
    }, 2000);
  }
}
