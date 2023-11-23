import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Campo {
  nombre: string;
  seleccionado: boolean;
}

@Component({
  selector: 'app-datos-salud',
  templateUrl: 'datos-salud.page.html',
  styleUrls: ['datos-salud.page.scss']
})
export class DatosSaludPage {

  mostrarLista = false;
  cardClicked: string | null = null;

  // Campos para la sección 'enfermedades'
  enfermedadesCampos: Campo[] = [
    { nombre: 'Hipertensión', seleccionado: false },
    { nombre: 'Cáncer', seleccionado: false },
    { nombre: 'Asma', seleccionado: false },
    { nombre: 'Cardiopatia', seleccionado: false },
    { nombre: 'Colesterol Alto', seleccionado: false },
    { nombre: 'Artritis', seleccionado: false },
    // Agrega los demás campos según sea necesario
  ];

  // Campos para la sección 'alergias'
  alergiasCampos: Campo[] = [
    { nombre: 'Alimentaria', seleccionado: false },
    { nombre: 'Ambiental', seleccionado: false },
    { nombre: 'Insectos', seleccionado: false },
    { nombre: 'Medicamentos', seleccionado: false },
    // Agrega los demás campos según sea necesario
  ];

  // Campos para la sección 'medicamentos'
  medicamentosCampos: Campo[] = [
    { nombre: 'Nombre del Medicamento', seleccionado: false },
    { nombre: 'Frecuencia', seleccionado: false },
    { nombre: 'Dosificación', seleccionado: false },
    { nombre: 'Administración', seleccionado: false },
    { nombre: 'Almacenamiento', seleccionado: false },
    // Agrega los demás campos según sea necesario
  ];

  // Campos para la sección 'informacion'
  informacionCampos: Campo[] = [
    { nombre: 'Información adicional 1', seleccionado: false },
    { nombre: 'Información adicional 2', seleccionado: false },
    // Agrega los demás campos según sea necesario
  ];

  constructor(private alertCtrl: AlertController, private router: Router, private ngZone: NgZone) {}

  handleCardClick(cardType: string) {
    this.mostrarLista = !this.mostrarLista;
    this.cardClicked = cardType;
  }

  cancelar() {
    this.mostrarLista = false;
    this.cardClicked = null;
  }

  // Verifica si hay al menos un campo seleccionado en la sección actual
  hayAlMenosUnCampoSeleccionado(campos: Campo[]): boolean {
    return campos.some(c => c.seleccionado);
  }

  // Verifica si todos los campos en la sección actual están llenos
  camposLlenadosEnSeccion(campos: Campo[]): boolean {
    return campos.some(campo => campo.seleccionado);
  }

  async guardar() {
    switch (this.cardClicked) {
      case 'enfermedades':
      case 'alergias':
        this.guardarLista();
        break;
      case 'medicamentos':
      case 'informacion':
        this.guardarFormulario();
        break;
      default:
        break;
    }
  }

  guardarLista() {
    let camposSeccionActual: Campo[] = [];

    // Selecciona los campos correspondientes a la sección actual
    switch (this.cardClicked) {
      case 'enfermedades':
        camposSeccionActual = this.enfermedadesCampos;
        break;
      case 'alergias':
        camposSeccionActual = this.alergiasCampos;
        break;
      default:
        break;
    }

    // Verifica si la sección actual tiene el campo "Otros"
    const tieneCampoOtros = camposSeccionActual.some(campo => campo.nombre === 'Otros');

    // Verifica si hay información ingresada en "Otros"
    const otrosCampo = camposSeccionActual.find(campo => campo.nombre === 'Otros');
    const hayInformacionOtros = otrosCampo && otrosCampo.seleccionado;

    // Verifica si hay al menos un campo seleccionado en la sección actual
    const haySeleccionado = this.hayAlMenosUnCampoSeleccionado(camposSeccionActual);

    if (tieneCampoOtros && (hayInformacionOtros || haySeleccionado)) {
      this.mostrarAlertaExito();
    } else if (!tieneCampoOtros && haySeleccionado) {
      this.mostrarAlertaExito();
    } else {
      this.mostrarAlertaError();
    }
  }

  guardarFormulario() {
    let camposSeccionActual: Campo[] = [];

    // Selecciona los campos correspondientes a la sección actual
    switch (this.cardClicked) {
      case 'medicamentos':
        camposSeccionActual = this.medicamentosCampos;
        break;
      case 'informacion':
        camposSeccionActual = this.informacionCampos;
        break;
      default:
        break;
    }

    // Verifica si hay información ingresada en "Otros"
    const otrosCampo = camposSeccionActual.find(campo => campo.nombre === 'Otros');
    const hayInformacionOtros = otrosCampo && otrosCampo.seleccionado;

    // Verifica si todos los campos en la sección actual están llenos
    const camposLlenados = this.camposLlenadosEnSeccion(camposSeccionActual);

    // Verifica si hay información ingresada en los formularios (excepto "Otros")
    const formulariosLlenos = camposSeccionActual.filter(campo => campo.nombre !== 'Otros').some(campo => campo.seleccionado);

    if (camposLlenados || hayInformacionOtros || formulariosLlenos) {
      this.mostrarAlertaExito();
    } else {
      this.mostrarAlertaError();
    }
  }

  async mostrarAlertaExito() {
    console.log('Guardando datos...');

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Datos guardados',
      buttons: ['OK']
    });

    await alert.present();
  }

  async mostrarAlertaError() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Selecciona al menos un campo o ingresa información en "Otros"',
      buttons: ['OK']
    });

    await alert.present();
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

}
