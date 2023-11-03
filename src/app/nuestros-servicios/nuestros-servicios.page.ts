import { Component } from '@angular/core';

@Component({
  selector: 'app-nuestros-servicios',
  templateUrl: './nuestros-servicios.page.html',
  styleUrls: ['./nuestros-servicios.page.scss'],
})
export class NuestrosServiciosPage {
  constructor() {}

  
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
