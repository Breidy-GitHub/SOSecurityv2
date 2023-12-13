import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {
  datosRecibidos: any;
  contactos: any[] = [];

  constructor(private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.datosRecibidos = params;
  });
}

ngOnInit() {
  const state = this.router.getCurrentNavigation()?.extras.state as any;

  // Recuperar contactos existentes del localStorage
  const storedContactos = localStorage.getItem('contactos');
  this.contactos = storedContactos ? JSON.parse(storedContactos) : [];

  if (state && state.nuevoContacto) {
    const nuevoContacto = state.nuevoContacto;

    // Verificar si el nuevo contacto ya existe en la lista
    const existeContacto = this.contactos.some(contacto => contacto.id === nuevoContacto.id);

    if (!existeContacto) {
      this.contactos.push(nuevoContacto);

      // Almacenar todos los contactos actualizados en localStorage
      localStorage.setItem('contactos', JSON.stringify(this.contactos));
    }
  }

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
  navigateToDatosSaludPage() {
    this.router.navigate(['datos-salud']);
  }
  navigateToAdmin() {
    this.router.navigate(['/administrador']);
  }
  navigateToAlert() {
    this.router.navigate(['mis-alertas']);
  }
  getContactos() {
    return this.contactos;
  }
  abrirBarraLateral() {
    this.ngZone.run(() => {
      const menu = document.querySelector('ion-menu');
      if (menu) {
        menu.open();
      }
    });
  }

  //modificar contactos
  async modificarContacto(contacto: any) {
    const alert = await this.alertController.create({
      header: 'Modificar Contacto',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: contacto.nombre,
          placeholder: 'Nombres',
        },
        {
          name: 'apellidos',
          type: 'text',
          value: contacto.apellidos,
          placeholder: 'Apellidos',
        },
        {
          name: 'parentezco',
          type: 'text',
          value: contacto.parentezco,
          placeholder: 'Parentezco',
        },
        {
          name: 'numeroCelular',
          type: 'tel',
          value: contacto.numeroCelular,
          placeholder: 'Número de Celular',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            // Actualizar los datos del contacto local
            contacto.nombre = data.nombre;
            contacto.apellidos = data.apellidos;
            contacto.parentezco = data.parentezco;
            contacto.numeroCelular = data.numeroCelular;

            // Actualizar el almacenamiento local con los cambios
            localStorage.setItem('contactos', JSON.stringify(this.contactos));

            // Actualizar el contacto en el servidor
            try {
              await this.actualizarContactoEnServidor(contacto);
            } catch (error) {
              console.error('Error al actualizar el contacto en el servidor', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  private async actualizarContactoEnServidor(contacto: any) {
    const url = 'http://localhost:3000/contactos_emergencia/' + contacto.id;

    try {
      // Crear un objeto con las propiedades que deseas actualizar
      const datosActualizados = {
        nombre: contacto.nombre,
        apellidos: contacto.apellidos,
        parentezco: contacto.parentezco,
        telefono: contacto.numeroCelular,  // Asegúrate de que coincida con el nombre esperado en el servidor
      };

      // Enviar solo las propiedades que deseas actualizar al servidor
      await this.http.put(url, datosActualizados).toPromise();
      console.log('Contacto actualizado en el servidor');
    } catch (error) {
      throw error;
    }
  }
  //eliminar contactos
  eliminarContacto(index: number) {
    const contacto = this.contactos[index];
    this.contactos.splice(index, 1);
    localStorage.setItem('contactos', JSON.stringify(this.contactos));

    // Eliminar del servidor
    this.eliminarContactoEnServidor(contacto).then(() => {
      console.log('Contacto eliminado del servidor');
    }).catch(error => {
      console.error('Error al eliminar el contacto en el servidor', error);
    });
  }
  private async eliminarContactoEnServidor(contacto: any) {
    const url = 'http://localhost:3000/contactos_emergencia/' + contacto.id;

    try {
      await this.http.delete(url).toPromise();
      console.log('Contacto eliminado del servidor');
    } catch (error) {
      throw error;
    }
  }
}
