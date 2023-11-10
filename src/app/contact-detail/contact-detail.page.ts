import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {
  datosRecibidos: any;

  constructor(private ngZone: NgZone, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.datosRecibidos = params;
  });
}

  ngOnInit() {

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
  navigateToAdmin() {
    this.router.navigate(['/administrador']);
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
