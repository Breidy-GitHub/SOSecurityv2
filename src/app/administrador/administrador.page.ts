import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  searchText: string = '';

  constructor(private router: Router, private ngZone: NgZone,) { }

  onSearch(event: any) {
    const searchTerm = event.detail.value;
  }

  ngOnInit() {
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

}
