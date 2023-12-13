import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'acerca-de-nosotros',
    loadChildren: () => import('./acerca-de-nosotros/acerca-de-nosotros.module').then( m => m.AcercaDeNosotrosPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'nuestros-servicios',
    loadChildren: () => import('./nuestros-servicios/nuestros-servicios.module').then( m => m.NuestrosServiciosPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./contactanos/contactanos.module').then( m => m.ContactanosPageModule),
    //canActivate: [AuthGuard]
  },


  {
    path: 'contact-detail',
    loadChildren: () => import('./contact-detail/contact-detail.module').then( m => m.ContactDetailPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorPageModule),
    //canActivate: [AuthGuard]
  },

  {
    path: 'datos-salud',
    loadChildren: () => import('./datos-salud/datos-salud.module').then( m => m.DatosSaludPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'mis-alertas',
    loadChildren: () => import('./mis-alertas/mis-alertas.module').then( m => m.MisAlertasPageModule),
    //canActivate: [AuthGuard]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
