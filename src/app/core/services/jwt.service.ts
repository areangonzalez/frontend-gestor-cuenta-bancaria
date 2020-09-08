import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken() {
    return JSON.parse(localStorage.getItem('token-gdi'));
  }

  saveToken(datosToken: object) {
      localStorage.setItem('token-gdi', JSON.stringify({ datosToken }));
  }

  destroyToken() {
      localStorage.removeItem('token-gdi');
  }
}
