import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateCharPageRoutingModule } from './create-char-routing.module';

import { CreateCharPage } from './create-char.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateCharPageRoutingModule,
  ],
  declarations: [CreateCharPage],
})
export class CreateCharPageModule {}
