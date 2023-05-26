import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'character/:id',
        loadChildren: () =>
          import('../character-overview/character-overview.module').then(
            (m) => m.CharacterOverviewPageModule
          ),
      },
      {
        path: 'character/attributes/:characterid',
        loadChildren: () =>
          import('../character-attr/character-attr.module').then(
            (m) => m.CharacterAttrPageModule
          ),
      },
      {
        path: 'character/dice-rolling/:characterid/:rollname/:rollvalue/:bonus',
        loadChildren: () =>
          import('../dice-rolling/dice-rolling.module').then(
            (m) => m.DiceRollingPageModule
          ),
      },
      {
        path: 'character/inventory/:characterid',
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryPageModule
          ),
      },
      {
        path: 'character/skills-powers/:characterid',
        loadChildren: () =>
          import('../skills-powers/skills-powers.module').then(
            (m) => m.SkillsPowersPageModule
          ),
      },
      {
        path: 'character/combat-attr/:characterid',
        loadChildren: () =>
          import('../combat-attr/combat-attr.module').then(
            (m) => m.CombatAttrPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
