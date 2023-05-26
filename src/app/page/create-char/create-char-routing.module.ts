import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCharPage } from './create-char.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCharPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCharPageRoutingModule {}
