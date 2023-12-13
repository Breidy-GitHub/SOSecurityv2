import { HttpClient } from '@angular/common/http';
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
  dataRow: any = [];
  vistaOpt1: Boolean = false;
  vistaOpt2: Boolean = false;
  vistaOpt3: Boolean = false;
  vistaOpt4: Boolean = false;
  selectedCard: string | null = null;
  userAddress: string | undefined;


  constructor(
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) { }

  onSearch(event: any) {
    const searchTerm = event.detail.value.toLowerCase();

    if (searchTerm.trim() !== '') {
      this.array = this.array.filter((d) => {
        return (
          d.fecha.toLowerCase().includes(searchTerm) ||
          d.evento.toLowerCase().includes(searchTerm) ||
          d.usuario.toLowerCase().includes(searchTerm) ||
          d.detalles.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      this.array = this.getOriginalData();
    }
  }
  private getOriginalData(): any[] {
    return [
    ];
  }

  ngOnInit() {
    this.array = this.getOriginalData();
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
        this.getEventos('eventos');
        this.vistaOpt1 = true;
        this.vistaOpt2 = false;
        this.vistaOpt3 = false;
        this.vistaOpt4 = false;

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

  // metodo consulta back
  getEventos(ruta: string) {
    this.http.get(`http://localhost:3000/eventos`).subscribe(
        (data: any) => {
            if (data.success) {
                this.array = this.formatEventos(data.data);
                console.log('Eventos obtenidos:', this.array);
            } else {
                console.error('Error al obtener eventos:', data.error);
            }
        },
        (error) => {
            console.error('Error de conexión:', error);
        }
    );
}

formatEventos(data: any[]): any[] {
  return data.map((evento: any) => {
      return {
          fecha: new Date(evento.fecha).toLocaleString('es-CO'),
          evento: evento.evento,
          nombre: evento.nombreUsuario,
          detalles: evento.detalles,
          accion: evento.accion,
          talerta: evento.talerta
      };
  });
}
}
