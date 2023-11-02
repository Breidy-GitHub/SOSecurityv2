  import { Component, NgZone, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { google } from 'google-maps';
  import { AlertController } from '@ionic/angular';


  @Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
  })
  export class HomePage {
    userLocation: any;
    map: google.maps.Map | undefined;
    userAddress: string | undefined;
    ubicacionUsuario: google.maps.Marker | undefined;

    constructor(private ngZone: NgZone, private router: Router, private alertController: AlertController) {}

    ngOnInit(): void {
      window.addEventListener('load', () => {
        this.getUserLocation();
      });
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

    abrirBarraLateral() {
      this.ngZone.run(() => {
        const menu = document.querySelector('ion-menu');
        if (menu) {
          menu.open();
        }
      });
    }
    async mostrarAlerta() {
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
            handler: (data) => {
              console.log('Datos ingresados:', data);
              this.router.navigate(['/contact-detail', data]);
            }
          }
        ],
        cssClass: 'custom-alert'
      });

      await alert.present();
    }
  }
