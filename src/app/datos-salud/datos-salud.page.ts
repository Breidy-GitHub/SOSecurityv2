import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController si necesitas navegar a otras páginas

@Component({
  selector: 'app-datos-salud',
  templateUrl: 'datos-salud.page.html',
  styleUrls: ['datos-salud.page.scss'],
})
export class DatosSaludPage {

  mostrarLista = false;

  // Método para manejar el clic en la tarjeta
  handleCardClick() {
    // Cambiar la visibilidad de la lista al hacer clic en la tarjeta
    this.mostrarLista = !this.mostrarLista;
  }

}
