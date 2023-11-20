import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NovaPageRoutingModule } from './nova-routing.module';

import { NovaPage } from './nova.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, NovaPageRoutingModule],
  declarations: [NovaPage],
})
export class NovaPageModule {}
