import { Component, AfterViewInit,NgZone, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acerca-de-nosotros',
  templateUrl: './acerca-de-nosotros.page.html',
  styleUrls: ['./acerca-de-nosotros.page.scss'],
})
export class AcercaDeNosotrosPage implements AfterViewInit {
  slides = [
    {
      image: '/assets/icon/equipo.jfif',
      description: '',
    },
    {
      image: '/assets/icon/equipo.jfif',
      description: '',
    },
    {
      image: '/assets/icon/equipo.jfif',
      description: '',
    },
    {
      image:'/assets/icon/equipo.jfif',
      description: '',
    },
  ];

  swiper: Swiper;

constructor(private router: Router,private ngZone: NgZone) {
  this.swiper = new Swiper('.swiper-container');
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
  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
