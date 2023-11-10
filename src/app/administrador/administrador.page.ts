import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  searchText: string = '';
  mostrarLista = false;
  array: any[] = [];
  vistaOpt1: Boolean = false;
  vistaOpt2: Boolean = false;
  vistaOpt3: Boolean = false;
  vistaOpt4: Boolean = false;
  selectedCard: string | null = null;


  constructor(private router: Router, private ngZone: NgZone,) { }

  onSearch(event: any) {
    const searchTerm = event.detail.value;
  }

  ngOnInit() {
  }

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

  abrirBarraLateral() {
    this.ngZone.run(() => {
      const menu = document.querySelector('ion-menu');
      if (menu) {
        menu.open();
      }
    });
  }

  mostrarEventos(valor: string) {

    switch (valor) {
      case 'Eventos de seguridad':

        let data = [
          {
            fecha: '2023-11-09',
            evento: 'Fiesta',
            usuario: 'Pablo',
            detalles: 'no hay'
          },
          {
            fecha: '2023-11-10',
            evento: 'Trabajo',
            usuario: 'Andres Ricardo Parra Salas',
            detalles: 'Trabaja en Tigo'
          }
        ]

        this.vistaOpt1 = true;
        this.vistaOpt2 = false;
        this.vistaOpt3 = false;
        this.vistaOpt4 = false;

        this.array=data;

        console.log(this.array);

        break;

        case 'Actividades de usuario':
          this.vistaOpt1 = false;
          this.vistaOpt2 = true;
          this.vistaOpt3 = false;
          this.vistaOpt4 = false;
        break;

        case 'Alertas emitidas':
          this.vistaOpt1 = false;
          this.vistaOpt2 = false;
          this.vistaOpt3 = true;
          this.vistaOpt4 = false;
        break;

        case 'Respaldo y restauración de datos':
          this.vistaOpt1 = false;
          this.vistaOpt2 = false;
          this.vistaOpt3 = false;
          this.vistaOpt4 = true;
        break;

      default:
        break;
    }
    this.selectedCard = valor;
  }



}
