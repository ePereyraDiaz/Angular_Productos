import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSessionService {

  constructor() { }

  getId() {
    return localStorage['idUsuario'];
  }
  getNombre() {
    return localStorage['usuario'];
  }
  getCorreo() {
    return localStorage['emailUsuario'].toLowerCase();
  }
}
