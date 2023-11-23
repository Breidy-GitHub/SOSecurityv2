import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisAlertasPageRoutingModule } from './mis-alertas-routing.module';

import { MisAlertasPage } from './mis-alertas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisAlertasPageRoutingModule
  ],
  declarations: [MisAlertasPage]
})
export class MisAlertasPageModule {}
