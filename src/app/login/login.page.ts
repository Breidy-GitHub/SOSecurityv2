import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData = {
    nombre: '',
    email: '',
    password: ''
  };

  userData2 = {
    email: '',
    password: ''
  };
  userData3 = {
    email: ''
  };

  constructor(private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private authService: AuthService) { }

  ngOnInit() {
    const btsignIn = document.querySelector("#sign-in") as HTMLElement; //Añadimos el botón de iniciar sesion
    const btsignUp = document.getElementById("sign-up") as HTMLElement; //Añadimos el botón de registrarse
    const btnRecu = document.getElementById("sign-recu") as HTMLElement; // Añadimos el botón de recuperación
    const btnSinRecu = document.getElementById("sign-in-recu") as HTMLElement; // Añadimos el boton de regreso del componente de recuperacion
    const formRegister = document.querySelector(".register") as HTMLElement;
    const formLogin = document.querySelector(".login") as HTMLElement;
    const formRecu = document.querySelector(".recu") as HTMLElement;


    btsignIn.addEventListener("click", () => {
      formRegister.classList.add("hide");
      formLogin.classList.remove("hide");
      formRecu.classList.add("hide");
    });

    btsignUp.addEventListener("click", () => {
      formLogin.classList.add("hide");
      formRegister.classList.remove("hide");
      formRecu.classList.add("hide");
    });

    btnRecu.addEventListener("click", (e) => {
      e.preventDefault();
      formLogin.classList.add("hide");
      formRegister.classList.add("hide");
      formRecu.classList.remove("hide");
    });

    btnSinRecu.addEventListener("click", () => {
      formLogin.classList.remove("hide");
      formRegister.classList.add("hide");
      formRecu.classList.add("hide");
    })
  }

  //registrar usuario
  async registerUser() {
    // Verificar si los campos están llenos
    if (!this.userData.nombre || !this.userData.email || !this.userData.password) {
      await this.mostrarAlertaNoDatos();
      return;
    }

    // Deshabilitar el botón para evitar clics adicionales
    const registerButton = document.querySelector("#registerButton") as HTMLButtonElement;
    registerButton.disabled = true;

    this.http.post('http://localhost:3000/login', this.userData)
      .subscribe(async (response: any) => {
        console.log(response);
        await this.mostrarAlertaExitosa();
      }, async (error) => {
        console.error(error);
        if (error.error && error.error.error === 'El correo electrónico ya está registrado') {
          await this.mostrarAlertaUsuarioRegistrado();
        } else {
          await this.mostrarAlertaErrorRegistro();
        }
      })
      .add(() => {
        // Habilitar el botón después de que se complete la solicitud (éxito o error)
        registerButton.disabled = false;
      });
  }

  async mostrarAlertaNoDatos() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Favor llenar todos los campos',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            this.userData = {
              nombre: '',
              email: '',
              password: ''
            };
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async mostrarAlertaExitosa() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Su registro fue exitoso',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            this.userData = {
              nombre: '',
              email: '',
              password: ''
            };
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async mostrarAlertaUsuarioRegistrado() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario registrado. Por favor, inicie sesión.',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            this.userData = {
              nombre: '',
              email: '',
              password: ''
            };
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async mostrarAlertaErrorRegistro() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un error en el registro. Inténtelo nuevamente.',
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  //inicio secion
  async loginUser() {
    console.log('Ingresando loginUser');
    // Verificar si los campos están llenos
    if (!this.userData2.email || !this.userData2.password) {
      await this.mostrarAlertaNoDatos2();
      return;
    }

    // Deshabilitar el botón para evitar clics adicionales
    const loginButton = document.querySelector("#loginButton") as HTMLButtonElement;
    loginButton.disabled = true;

    this.http.post('http://localhost:3000/login/authenticate', this.userData2)
    .subscribe(async (response: any) => {
    console.log(response);

    // Guarda el token JWT en localStorage
    localStorage.setItem('token', response.token);

    this.authService.login(); // Marca al usuario como autenticado

    this.navigateToHome(); // Redirige al usuario a la página principal

  }, async (error) => {
    console.error(error);
    await this.mostrarAlertaCredencialesIncorrectas();
  })
  .add(() => {
    // Habilita el botón después de que se complete la solicitud (éxito o error)
    loginButton.disabled = false;
  });
  }
  async mostrarAlertaCredencialesIncorrectas() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            // Solo asigna las propiedades necesarias para el inicio de sesión
            this.userData2 = {
              email: '',
              password: ''
            };
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }
  async mostrarAlertaNoDatos2() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Favor llenar todos los campos',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            this.userData2 = {
              email: '',
              password: ''
            };
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  // Recuperar contraseña
  async recuperarContrasena() {
    // Verificar si el campo de correo electrónico está lleno
    if (!this.userData3.email) {
      await this.mostrarAlertaNoDatos3();
      return;
    }

    // Deshabilitar el botón para evitar clics adicionales
    const recuperarButton = document.querySelector("#recuperarButton") as HTMLButtonElement;
    recuperarButton.disabled = true;

    // Llamada a la API para recuperar la contraseña
    this.http.post('http://localhost:3000/login/recuperar-contrasena', { email: this.userData3.email })
      .subscribe(async (response: any) => {
        console.log(response);
        await this.mostrarAlertaRecuperacionExitosa();
      }, async (error) => {
        console.error(error);
        if (error.status === 404) {
          await this.mostrarAlertaUsuarioNoEncontrado();
        } else {
          await this.mostrarAlertaErrorRecuperacion();
        }
      })
      .add(() => {
        // Habilitar el botón después de que se complete la solicitud (éxito o error)
        recuperarButton.disabled = false;
      });
  }
  async mostrarAlertaNoDatos3() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Favor llenar todos los campos',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            this.userData3 = {
              email: ''
            };
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async mostrarAlertaRecuperacionExitosa() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se ha enviado un correo con la contraseña.',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            // Limpia el campo de recuperación de contraseña
            this.userData3.email = '';
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async mostrarAlertaUsuarioNoEncontrado() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El correo electrónico no está registrado.',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            // Limpia el campo de recuperación de contraseña
            this.userData3.email = '';
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async mostrarAlertaErrorRecuperacion() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un error durante la recuperación de contraseña. Inténtelo nuevamente.',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            // Limpia el campo de recuperación de contraseña
            this.userData3.email = '';
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
