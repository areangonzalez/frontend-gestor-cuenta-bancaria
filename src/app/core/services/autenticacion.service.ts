import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtService } from "./jwt.service";
import { ApiService } from './api.service';
import { Usuario, UserConvenio } from './../models';

@Injectable({ providedIn: 'root' })
export class AutenticacionService {

    constructor( private _http: ApiService, private _jwtService: JwtService ) { }

  /**
   * verifico si esta logueado el usuario
   */
  public get loggedIn(): Usuario {
    let user: Usuario = this._jwtService.getToken();
    return user;
  }

    login(params) {
      return this._http.post('/usuarios/login', { username: params.username, password_hash: params.password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
            this._jwtService.saveToken(user);
          }
          return user;
      }));
    }
    /**
     * Cierra la sesion destruyend el token
     */
    logout() {
      // remove user from local storage to log user out
      this._jwtService.destroyToken();
    }
    /**
     * Consigue el nombre del usuario
     */
    getUserName() {
      let userLogin = this._jwtService.getToken();
      return userLogin.datosToken.username;
    }

    getConvenioUser() {
      let convenios = this.loggedIn.lista_convenio;
      let lista_convenio: UserConvenio = {mostrar: false, convenio: []};
      switch (convenios.length) {
        case 0:
          lista_convenio.mostrar = (this.loggedIn.rol == "admin") ? true : false;
          break;
        case 1:
          lista_convenio.mostrar = false;
          lista_convenio.convenio = this.loggedIn.lista_convenio;
          break;
        default:
          lista_convenio.mostrar = true;
          lista_convenio.convenio = this.loggedIn.lista_convenio;
          break;
      }

      return lista_convenio;
    }
}
