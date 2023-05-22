import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./page/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'characters',
    loadChildren: () => import('./page/characters/characters.module').then(m => m.CharactersPageModule)
  },
  {
    path: 'character/:id',
    loadChildren: () => import('./page/character-overview/character-overview.module').then(m => m.CharacterOverviewPageModule)
  },
  {
    path: 'character/attributes/:characterid',
    loadChildren: () => import('./page/character-attr/character-attr.module').then(m => m.CharacterAttrPageModule)
  },
  {
    path: 'character/dice-rolling/:characterid/:rollname/:rollvalue/:bonus',
    loadChildren: () => import('./page/dice-rolling/dice-rolling.module').then(m => m.DiceRollingPageModule)
  },
  {
    path: 'character/inventory/:characterid',
    loadChildren: () => import('./page/inventory/inventory.module').then(m => m.InventoryPageModule)
  },
  {
    path: 'character/skills-powers/:characterid',
    loadChildren: () => import('./page/skills-powers/skills-powers.module').then(m => m.SkillsPowersPageModule)
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
