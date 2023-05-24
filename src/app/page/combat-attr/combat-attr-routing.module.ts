import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombatAttrPage } from './combat-attr.page';

const routes: Routes = [
  {
    path: '',
    component: CombatAttrPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombatAttrPageRoutingModule {}
