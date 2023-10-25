import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {

  constructor(private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
  }

  navigateTocontact() {
    this.router.navigate(['/contact-detail']);
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
