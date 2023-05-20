import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DiceRollingPageRoutingModule } from './dice-rolling-routing.module';

import { DiceRollingPage } from './dice-rolling.page';
import { TabsPageModule } from '../../tabs/tabs.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DiceRollingPageRoutingModule,
    TabsPageModule,
  ],
  declarations: [DiceRollingPage]
})
export class DiceRollingPageModule {}
