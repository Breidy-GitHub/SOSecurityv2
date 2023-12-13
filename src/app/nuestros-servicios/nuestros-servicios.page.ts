import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nuestros-servicios',
  templateUrl: './nuestros-servicios.page.html',
  styleUrls: ['./nuestros-servicios.page.scss'],
})
export class NuestrosServiciosPage {
  constructor(private router: Router, private ngZone: NgZone, private alertController: AlertController) {}


  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToNosotros() {
    this.router.navigate(['/acerca-de-nosotros']);
  }
  navigateToContac() {
    this.router.navigate(['/contactanos']);
  }
  navigateToNuestros() {
    this.router.navigate(['/nuestros-servicios']);
  }
  navigateToDatosSaludPage() {
    this.router.navigate(['datos-salud']);
  }
  navigateToAlert() {
    this.router.navigate(['mis-alertas']);
  }

  abrirBarraLateral() {
    this.ngZone.run(() => {
      const menu = document.querySelector('ion-menu');
      if (menu) {
        menu.open();
      }
    });
  }
  mostrarParrafoAdicional = false;

  toggleParrafoAdicional() {
    const parrafoAdicional = document.getElementById('parrafo-adicional');
    const verMasButton = document.getElementById('ver-mas');

    if (parrafoAdicional && verMasButton) {
      if (this.mostrarParrafoAdicional) {
        parrafoAdicional.style.display = 'none';
        verMasButton.textContent = 'Ver más';
      } else {
        parrafoAdicional.style.display = 'block';
        verMasButton.textContent = 'Ocultar';
      }


      this.mostrarParrafoAdicional = !this.mostrarParrafoAdicional;
    }
  }
}
