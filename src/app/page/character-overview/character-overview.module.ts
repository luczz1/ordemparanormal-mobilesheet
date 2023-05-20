import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharacterOverviewPageRoutingModule } from './character-overview-routing.module';

import { CharacterOverviewPage } from './character-overview.page';
import { TabsPageModule } from '../../tabs/tabs.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CharacterOverviewPageRoutingModule,
    TabsPageModule
  ],
  declarations: [CharacterOverviewPage]
})
export class CharacterOverviewPageModule {}
