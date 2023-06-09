import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CombatAttrPageRoutingModule } from './combat-attr-routing.module';

import { CombatAttrPage } from './combat-attr.page';
import { TabsPageModule } from '../../tabs/tabs.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CombatAttrPageRoutingModule,
    TabsPageModule
  ],
  declarations: [CombatAttrPage]
})
export class CombatAttrPageModule {}
