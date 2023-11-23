import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-alertas',
  templateUrl: './mis-alertas.page.html',
  styleUrls: ['./mis-alertas.page.scss'],
})
export class MisAlertasPage implements OnInit {

  searchText: string = '';
  mostrarLista = false;
  array: any[] = [];
  vistaOpt: Boolean = false;


  constructor(private router: Router, private ngZone: NgZone) { }


  ngOnInit() {
    this.mostrarEventos('Mis Alertas');
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
      case 'Mis Alertas':
        this.vistaOpt = true;
        this.array = [
          {
            fecha: '2023-11-16',
            tAlerta: 'Daño en propiedad ajena',
            ubicacion: 'Diagonal 69 G Bis Sur # 40 A 21',
            dispositivo: 'Xiaomi Redmi Note 11'
          },
          {
            fecha: '2023-11-09',
            tAlerta: 'Fuego',
            ubicacion: 'Av calle 24 # 37 - 15',
            dispositivo: 'Samsung Galaxy A22'
          },
          {
            fecha: '2023-11-16',
            tAlerta: 'Daño en propiedad ajena',
            ubicacion: 'Diagonal 69 G Bis Sur # 40 A 21',
            dispositivo: 'Xiaomi Redmi Note 11'
          },
          {
            fecha: '2023-11-09',
            tAlerta: 'Fuego',
            ubicacion: 'Av calle 24 # 37 - 15',
            dispositivo: 'Samsung Galaxy A22'
          },
          {
            fecha: '2023-11-16',
            tAlerta: 'Daño en propiedad ajena',
            ubicacion: 'Diagonal 69 G Bis Sur # 40 A 21',
            dispositivo: 'Xiaomi Redmi Note 11'
          },
          {
            fecha: '2023-11-09',
            tAlerta: 'Fuego',
            ubicacion: 'Av calle 24 # 37 - 15',
            dispositivo: 'Samsung Galaxy A22'
          }
        ];
        break;
      }
    }
  }
