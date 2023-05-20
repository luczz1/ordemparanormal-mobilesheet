import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterOverviewPage } from './character-overview.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterOverviewPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterOverviewPageRoutingModule {}
