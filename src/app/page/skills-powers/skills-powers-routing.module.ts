import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsPowersPage } from './skills-powers.page';

const routes: Routes = [
  {
    path: '',
    component: SkillsPowersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsPowersPageRoutingModule {}
