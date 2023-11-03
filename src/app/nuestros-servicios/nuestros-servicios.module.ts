import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuestrosServiciosPageRoutingModule } from './nuestros-servicios-routing.module';

import { NuestrosServiciosPage } from './nuestros-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuestrosServiciosPageRoutingModule
  ],
  declarations: [NuestrosServiciosPage]
})
export class NuestrosServiciosPageModule {}
