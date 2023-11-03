import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuestrosServiciosPage } from './nuestros-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: NuestrosServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuestrosServiciosPageRoutingModule {}
