import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterAboutPage } from './character-about.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterAboutPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterAboutPageRoutingModule {}
