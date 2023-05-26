import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateCharPageRoutingModule } from './create-char-routing.module';

import { CreateCharPage } from './create-char.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CreateCharPageRoutingModule
  ],
  declarations: [CreateCharPage]
})
export class CreateCharPageModule {}
