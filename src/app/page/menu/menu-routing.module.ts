import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';
import { CharacterGuard } from 'src/app/guard/character.guard';

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
          canActivate: [CharacterGuard]
      },
      {
        path: 'character/attributes/:characterid',
        loadChildren: () =>
          import('../character-attr/character-attr.module').then(
            (m) => m.CharacterAttrPageModule
          ),
          canActivate: [CharacterGuard]
      },
      {
        path: 'character/dice-rolling/:characterid/:rollname/:rollvalue/:bonus',
        loadChildren: () =>
          import('../dice-rolling/dice-rolling.module').then(
            (m) => m.DiceRollingPageModule
          ),
          canActivate: [CharacterGuard]
      },
      {
        path: 'character/inventory/:characterid',
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryPageModule
          ),
          canActivate: [CharacterGuard]
      },
      {
        path: 'character/skills-powers/:characterid',
        loadChildren: () =>
          import('../skills-powers/skills-powers.module').then(
            (m) => m.SkillsPowersPageModule
          ),
          canActivate: [CharacterGuard]
      },
      {
        path: 'character/combat-attr/:characterid',
        loadChildren: () =>
          import('../combat-attr/combat-attr.module').then(
            (m) => m.CombatAttrPageModule
          ),
          canActivate: [CharacterGuard]
      },
      {
        path: 'character/edit/:characterid',
        loadChildren: () => import('../create-char/create-char.module').then(m => m.CreateCharPageModule),
        canActivate: [CharacterGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
