import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { google } from 'google-maps'; // Ensure 'google-maps' module is correctly imported
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userLocation: any;
  map: google.maps.Map | undefined;
  userAddress: string | undefined;
  ubicacionUsuario: google.maps.Marker | undefined;
  contactos: any[] = [];

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private http: HttpClient) {}

  ngOnInit(): void {
    //if (!this.authService.isLoggedIn()) {
      //this.router.navigate(['/login']);}
      window.addEventListener('load', () => {
      this.getUserLocation();
    });
  }

  sendSOSMessage() {
  if (navigator.userAgent.match(/Android|iOS/i)) {
    const message = `¡Necesito ayuda! Mi ubicación actual es: ${this.userAddress}`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${this.userLocation.latitude},${this.userLocation.longitude}`;

    this.contactos.forEach((contacto) => {
      const phoneNumber = contacto.phoneNumbers[0]?.value;
      if (phoneNumber) {
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(`${message}\n${mapsLink}`)}`;
        window.open(whatsappUrl, '_blank');
      }
    });
  } else {
    this.sendSOSMessageWeb();
  }
}
  sendSOSMessageWeb() {
    const message = `¡Necesito ayuda! Mi ubicación actual es: ${this.userAddress}, https://www.google.com/maps/search/?api=1&query=${this.userLocation.latitude},${this.userLocation.longitude}`;

    // Obtener los contactos almacenados en la página 'contact-detail'
    const storedContactsJson = localStorage.getItem('contactos');

    if (storedContactsJson) {
      const storedContacts = JSON.parse(storedContactsJson) || [];

      // Verificar que haya al menos un contacto registrado
      if (storedContacts.length > 0) {
        // Enviar el mensaje a cada contacto registrado
        storedContacts.forEach((contacto: any) => {
          const phoneNumber = contacto.numeroCelular;
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        });
      } else {
        // Mostrar un mensaje si no hay contactos registrados
        this.mostrarAlertaNoContactos();
      }
    } else {
      // Mostrar un mensaje si no se encuentran datos en 'localStorage'
      this.mostrarAlertaNoDatos();
    }
  }

  mostrarAlertaNoContactos() {
    const alert = this.alertController.create({
      header: 'Error',
      message: 'No hay contactos registrados. Agregue un contacto.',
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    alert.then(alert => alert.present());
  }

  mostrarAlertaNoDatos() {
    const alert = this.alertController.create({
      header: 'Error',
      message: 'No se encontraron datos de contactos. Agregue un contacto.',
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    alert.then(alert => alert.present());
  }

  navigateToDatosSaludPage() {
    this.router.navigate(['datos-salud']);
  }
  navigateToAlert() {
    this.router.navigate(['mis-alertas']);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        if (this.userLocation) {
          const mapOptions: google.maps.MapOptions = {
            center: { lat: this.userLocation.latitude, lng: this.userLocation.longitude },
            zoom: 15,
          };
          this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

          this.ubicacionUsuario = new google.maps.Marker({
            position: { lat: this.userLocation.latitude, lng: this.userLocation.longitude },
            map: this.map,
            title: 'Usted está aquí',
            icon: '../../assets/marcador.png'
          });

          this.convertCoordinatesToAddress();

          navigator.geolocation.watchPosition((newPosition: any) => {
            const newLocation = {
              latitude: newPosition.coords.latitude,
              longitude: newPosition.coords.longitude
            };
            this.userLocation = newLocation;
            if (this.ubicacionUsuario) {
              this.ubicacionUsuario.setPosition(new google.maps.LatLng(newLocation.latitude, newLocation.longitude));
            }
          });
        }
      }, (error: any) => {
        console.error('Error al obtener la ubicación: ', error);
      });
    } else {
      console.error('Geolocalización no está disponible en este navegador.');
    }
  }

  convertCoordinatesToAddress() {
    if (this.userLocation && this.map) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(this.userLocation.latitude, this.userLocation.longitude);

      geocoder.geocode({ 'location': latlng }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results && results[0]) {
            this.userAddress = results[0].formatted_address;
          } else {
            console.error('No se encontraron resultados de geocodificación o "results" es nulo.');
          }
        } else {
          console.error('Error en la geocodificación: ' + status);
        }
      });
    }
  }

  navigateTocontact() {
    this.router.navigate(['/contact-detail']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToAdmin() {
    this.router.navigate(['/administrador']);
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

//agregar contactos
async agregarContacto() {
  const alert = await this.alertController.create({
    header: 'Agregar Contacto',
    inputs: [
      {
        name: 'nombre',
        type: 'text',
        placeholder: 'Nombres'
      },
      {
        name: 'apellidos',
        type: 'text',
        placeholder: 'Apellidos'
      },
      {
        name: 'parentezco',
        type: 'text',
        placeholder: 'Parentezco'
      },
      {
        name: 'numeroCelular',
        type: 'tel',
        placeholder: 'Número de Celular'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Operación cancelada');
        }
      },
      {
        text: 'Guardar',
        handler: async (data) => {
          if (this.todosLosCamposLlenos(data)) {
            try {
              // Enviar los datos al backend
              const response = await this.enviarDatosAlBackend(data);
              console.log('Respuesta del backend:', response);

              // Verifica si la respuesta incluye un ID
              if (response) {
                // Agregar el nuevo contacto al arreglo local
                const nuevoContacto = {
                  id: response,  // Asigna el ID retornado por el servidor
                  nombre: data.nombre,
                  apellidos: data.apellidos,
                  parentezco: data.parentezco,
                  numeroCelular: data.numeroCelular,
                };

                this.contactos.push(nuevoContacto);

                localStorage.setItem('contactos', JSON.stringify(this.contactos));

                // Navegar a la página contact-detail y pasar el nuevo contacto como parámetro
                this.router.navigate(['/contact-detail'], { state: { nuevoContacto } });
              } else {
                console.error('ID no disponible para el nuevo contacto');
              }
            } catch (error) {
              console.error('Error al enviar datos al backend:', error);
            }
          } else {
            this.agregarContacto();
            this.mostrarAlertaCamposVacios();
          }
        }
      }
    ],
    cssClass: 'custom-alert'
  });
  await alert.present();
}

// Nueva función para enviar datos al backend
async enviarDatosAlBackend(data: any) {
  const url = 'http://localhost:3000/contactos_emergencia';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: data.nombre,
        apellidos: data.apellidos,
        parentezco: data.parentezco,
        telefono: data.numeroCelular,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar datos al backend');
    }

    const responseData = await response.json();
    console.log('Respuesta del backend:', responseData);

    if (responseData && responseData.data && responseData.data.id) {
      // Si la respuesta incluye un ID, devuélvelo
      return responseData.data.id;
    } else {
      throw new Error('ID no encontrado en la respuesta del servidor');
    }
  } catch (error) {
    throw error;
  }
}

  todosLosCamposLlenos(data: any): boolean {
    return Object.values(data).every(value => value !== undefined && value !== '');
  }

  async mostrarAlertaCamposVacios() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Favor llenar todos los campos.',
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  //ingresar datos usuario y validacion cedula
  async solicitarCedula() {
    const alert = await this.alertController.create({
      header: 'Ingresar Número de Cédula',
      inputs: [
        {
          name: 'numero_documento',
          type: 'number',
          placeholder: 'Número de Cédula',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Validar',
          handler: async (data) => {
            if (data.numero_documento) {
              const isValid = await this.validarRegistroEnBD(data.numero_documento);

              if (!isValid) {
                this.mostrarDatos(data.numero_documento);
              } else {
                this.mostrarAlertaRegistroExistente();
              }
            } else {
              this.solicitarCedula();
            }
          },
        },
      ],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }

  async mostrarDatos(numero_documento: number) {
    const alert = await this.alertController.create({
      header: 'Ingresar Datos',
      inputs: [
        {
          name: 'numero_documento',
          type: 'number',
          placeholder: 'Número de Documento',
        },
        {
          name: 'tipo_identificacion',
          type: 'text',
          placeholder: 'Tipo de Identificación',
        },
        {
          name: 'telefono',
          type: 'text',
          placeholder: 'Número de Teléfono',
        },
        {
          name: 'fecha_nacimiento',
          type: 'date',
          placeholder: 'Fecha de Nacimiento',
        },
        {
          name: 'sexo',
          type: 'text',
          placeholder: 'Sexo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (this.todosLosCamposLlenos(data)) {
              // Validar en la base de datos antes de guardar
              const isRegistered = await this.validarRegistroEnBD(data.numero_documento);

              if (!isRegistered) {
                console.log('Datos ingresados:', data);

                // Guardar datos en la base de datos
                try {
                  const response = await this.http.post('http://localhost:3000/datos_usuarios', data).toPromise();
                  console.log('Respuesta del servidor:', response);

                  this.mostrarAlertaExito();
                } catch (error) {
                  console.error('Error al guardar datos en la base de datos:', error);
                }
              } else {
                this.mostrarAlertaRegistroExistente();
              }
            } else {
              this.mostrarDatos(numero_documento);
              this.mostrarAlertaCamposVacios();
            }
          },
        },
      ],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }

  async validarRegistroEnBD(numero_documento: number) {
    try {
      const response = await this.http.get(`http://localhost:3000/datos_usuarios/validar/${numero_documento}`).toPromise();

      if (response && 'success' in response && 'data' in response) {
        return response.success && response.data;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al validar registro en la base de datos:', error);
      return false;
    }
  }
  async mostrarAlertaRegistroExistente() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Datos ya registrados con anterioridad.',
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    alert.present();
  }
  mostrarAlertaExito() {
    const alert = this.alertController.create({
      header: 'Éxito',
      message: 'Datos guardados exitosamente.',
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    alert.then(alert => alert.present());
  }
}
