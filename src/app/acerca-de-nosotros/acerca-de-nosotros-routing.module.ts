import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcercaDeNosotrosPage } from './acerca-de-nosotros.page';

const routes: Routes = [
  {
    path: '',
    component: AcercaDeNosotrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcercaDeNosotrosPageRoutingModule {}
