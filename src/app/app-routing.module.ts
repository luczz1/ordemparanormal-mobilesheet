import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouterGuard } from './guard/route.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/menu/menu.module').then(m => m.MenuPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule),
    canActivate: [RouterGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./page/about/about.module').then(m => m.AboutPageModule),
    canActivate: [RouterGuard]
  },
  {
    path: 'characters',
    loadChildren: () => import('./page/characters/characters.module').then(m => m.CharactersPageModule),
    canActivate: [RouterGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./page/create-char/create-char.module').then(m => m.CreateCharPageModule),
    canActivate: [RouterGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
