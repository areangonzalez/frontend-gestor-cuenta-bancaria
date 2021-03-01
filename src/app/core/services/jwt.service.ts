import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken() {
    return JSON.parse(localStorage.getItem('token-gcb'));
  }

  saveToken(datosToken: object) {
      localStorage.setItem('token-gcb', JSON.stringify(datosToken));
  }

  destroyToken() {
      localStorage.removeItem('token-gcb');
  }
}
