import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterNotesPage } from './character-notes.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterNotesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterNotesPageRoutingModule {}
