import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

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

    btnSinRecu.addEventListener("click", ()=>{
      formLogin.classList.remove("hide");
      formRegister.classList.add("hide");
      formRecu.classList.add("hide");
    })
}
navigateToHome() {
  this.router.navigate(['/home']);
}
navigateToLogin() {
  this.router.navigate(['/login']);
}

}
