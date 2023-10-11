import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const btsignIn= document.getElementById("sign-in") as HTMLElement;
    const btsignUp= document.getElementById("sign-up") as HTMLElement;
    const formRegister = document.querySelector(".register") as HTMLElement;
    const formLogin = document.querySelector(".login") as HTMLElement;

    btsignIn.addEventListener("click", () => {
      formRegister.classList.add("hide");
      formLogin.classList.remove("hide");
    });

    btsignUp.addEventListener("click", () => {
      formLogin.classList.add("hide");
      formRegister.classList.remove("hide");
    });
  }

}

