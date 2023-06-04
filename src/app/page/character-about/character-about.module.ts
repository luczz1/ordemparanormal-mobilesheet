import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CharacterAboutPageRoutingModule } from './character-about-routing.module';

import { CharacterAboutPage } from './character-about.page';
import { TabsPageModule } from '../../tabs/tabs.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CharacterAboutPageRoutingModule,
    ReactiveFormsModule,
    TabsPageModule
  ],
  declarations: [CharacterAboutPage]
})
export class CharacterAboutPageModule {}
