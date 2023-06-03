import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharacterNotesPageRoutingModule } from './character-notes-routing.module';

import { CharacterNotesPage } from './character-notes.page';
import { TabsPageModule } from '../../tabs/tabs.module';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxEditorModule,
    CharacterNotesPageRoutingModule,
    TabsPageModule
  ],
  declarations: [CharacterNotesPage]
})
export class CharacterNotesPageModule {}
