import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { InventoryPage } from './inventory.page';
import { TabsPageModule } from '../../tabs/tabs.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InventoryPageRoutingModule,
    TabsPageModule
  ],
  declarations: [InventoryPage]
})
export class InventoryPageModule {}
