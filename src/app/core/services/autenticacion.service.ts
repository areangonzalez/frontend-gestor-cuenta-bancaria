import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtService } from "./jwt.service";
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AutenticacionService {

    constructor( private _http: ApiService, private _jwtService: JwtService ) { }

    login(params) {
      return this._http.post('/usuarios/login', { username: params.username, password_hash: params.password })
      .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.access_token) {
            let data = { username: '', token:'' };
            data.username = res.username;
            data.token = res.access_token;
            this._jwtService.saveToken(data);
            return true;
          }
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
     * Verifica si esta activo el token del usuario
     */
    loggedIn() {
      let userLogin = this._jwtService.getToken();
      if(userLogin && userLogin.datosToken) {
        return true;
      }else{
        return false;
      }
    }
    /**
     * Consigue el nombre del usuario
     */
    getUserName() {
      let userLogin = this._jwtService.getToken();

      return userLogin.datosToken.username;
    }
}
