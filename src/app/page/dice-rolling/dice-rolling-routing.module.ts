import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiceRollingPage } from './dice-rolling.page';

const routes: Routes = [
  {
    path: '',
    component: DiceRollingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiceRollingPageRoutingModule {}
