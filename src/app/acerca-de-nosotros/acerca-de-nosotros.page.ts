import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-acerca-de-nosotros',
  templateUrl: './acerca-de-nosotros.page.html',
  styleUrls: ['./acerca-de-nosotros.page.scss'],
})
export class AcercaDeNosotrosPage implements AfterViewInit {
  slides = [
    {
      image: '/assets/icon/equipo.jfif',
      description: 'Descripción de la imagen 1',
    },
    {
      image: '/assets/icon/equipo.jfif',
      description: 'Descripción de la imagen 2',
    },
    {
      image: '/assets/icon/equipo.jfif',
      description: 'Descripción de la imagen 3',
    },
    {
      image:'/assets/icon/equipo.jfif',
      description: 'Descripción de la imagen 4',
    },
  ];

  swiper: Swiper;

constructor() {
  this.swiper = new Swiper('.swiper-container');
}

  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}
