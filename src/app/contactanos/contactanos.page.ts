import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  
  constructor(private alertController: AlertController) {
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

  resetForm() {
    this.contact = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
}
