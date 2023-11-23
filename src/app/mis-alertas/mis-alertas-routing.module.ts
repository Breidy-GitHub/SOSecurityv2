import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisAlertasPage } from './mis-alertas.page';

const routes: Routes = [
  {
    path: '',
    component: MisAlertasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisAlertasPageRoutingModule {}
