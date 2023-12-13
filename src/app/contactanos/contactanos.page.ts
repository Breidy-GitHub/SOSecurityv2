import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage  {
  contact = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  constructor(private alertController: AlertController,private router: Router, private ngZone: NgZone) {
    this.resetForm();
  }

  async sendMessage() {
    if (this.contact.name && this.contact.email && this.contact.subject && this.contact.message) {
      // Si todos los campos están llenos, enviar el formulario
      localStorage.setItem('contactData', JSON.stringify(this.contact));

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Formulario enviado exitosamente',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.resetForm();
            },
          },
        ],
      });

      await alert.present();
    } else {
      // Si faltan campos, muestra una alerta de error
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos antes de enviar el formulario.',
        buttons: ['Aceptar'],
      });

      await errorAlert.present();
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

  resetForm() {
    this.contact = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
}
