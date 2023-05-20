import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharacterAttrPageRoutingModule } from './character-attr-routing.module';

import { CharacterAttrPage } from './character-attr.page';
import { TabsPageModule } from '../../tabs/tabs.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CharacterAttrPageRoutingModule,
    TabsPageModule
  ],
  declarations: [CharacterAttrPage]
})
export class CharacterAttrPageModule {}
