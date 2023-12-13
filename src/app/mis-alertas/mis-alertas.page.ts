import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mis-alertas',
  templateUrl: './mis-alertas.page.html',
  styleUrls: ['./mis-alertas.page.scss'],
})
export class MisAlertasPage implements OnInit {

  searchText: string = '';
  mostrarLista = false;
  array: any[] = [];
  eventos: any[] = [];
  vistaOpt: Boolean = false;


  constructor(private router: Router,
    private ngZone: NgZone,
    private http: HttpClient) { }


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
        this.http.get<any>('http://localhost:3000/eventos').subscribe(
          (data) => {
            this.eventos = this.adjustTimeZone (data.data) || [];
            this.vistaOpt = true;
          },
          (error) => {
            console.error('Error al obtener eventos', error);
          }
        );
        break;
    }
  }
  adjustTimeZone(eventos: any[]) {
    return eventos.map((evento) => {
      // Ajustar la zona horaria a UTC-5 (Colombia)
      const fechaLocal = new Date(evento.fecha);
      fechaLocal.setHours(fechaLocal.getHours() - 5);
      evento.fecha = fechaLocal.toISOString(); // Convertir de nuevo a cadena
      return evento;
    });
  }
  displayLocalTime(fecha: string) {
    const fechaLocal = new Date(fecha);
    return fechaLocal.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  }
}
