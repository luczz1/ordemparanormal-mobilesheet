import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkillsPowersPageRoutingModule } from './skills-powers-routing.module';

import { SkillsPowersPage } from './skills-powers.page';
import { TabsPageModule } from '../../tabs/tabs.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SkillsPowersPageRoutingModule,
    TabsPageModule
  ],
  declarations: [SkillsPowersPage]
})
export class SkillsPowersPageModule {}
