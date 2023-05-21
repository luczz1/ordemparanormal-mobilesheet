import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CharacterAttrPageRoutingModule } from './character-attr-routing.module';

import { CharacterAttrPage } from './character-attr.page';
import { TabsPageModule } from '../../tabs/tabs.module';
import { RollQuestionComponent } from './roll-question.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CharacterAttrPageRoutingModule,
    ReactiveFormsModule,
    TabsPageModule
  ],
  declarations: [CharacterAttrPage, RollQuestionComponent]
})
export class CharacterAttrPageModule {}
