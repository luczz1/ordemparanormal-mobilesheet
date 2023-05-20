import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterAttrPage } from './character-attr.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterAttrPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterAttrPageRoutingModule {}
