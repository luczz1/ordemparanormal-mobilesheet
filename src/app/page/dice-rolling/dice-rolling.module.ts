import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DiceRollingPageRoutingModule } from './dice-rolling-routing.module';

import { DiceRollingPage } from './dice-rolling.page';
import { TabsPageModule } from '../../tabs/tabs.module';
import { PipesModule } from 'src/app/services/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DiceRollingPageRoutingModule,
    TabsPageModule,
    PipesModule
  ],
  declarations: [DiceRollingPage]
})
export class DiceRollingPageModule {}
