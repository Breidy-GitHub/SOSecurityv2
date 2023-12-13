// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  // Método para iniciar sesión
  login() {
    this.isAuthenticated = true;
  }

  // Método para cerrar sesión
  logout() {
    this.isAuthenticated = false;
  }

  // Método para verificar si el usuario ha iniciado sesión
  isLoggedIn() {
    return this.isAuthenticated;
  }
}
