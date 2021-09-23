import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  /**
   * Función que se conecta a la api, para el creado y editado de una persona
   * @param params objeto que contiene los datos a guardar
   * @param id numero que identifica si se va a editar los datos (en lo contrario debe ser 0)
   */
  guardar(params: object, id: number) {
    if (id !== 0) {
      return this._http.put('/personas/' + id, params);
    }else {
      return this._http.post('/personas', params);
    }
  }
  /**
   * busca personas segun sus parametros
   * @param params parametros asignados sobre api
   */
  buscar(params: object) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/personas', httpParams);
  }
  /**
   * busca una persona por numero de id
   * @param id numero que identifica a una persona
   */
  buscarPorId(id: number) {
    return this._http.get('/personas/' + id);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      let httpParams = new HttpParams();
      httpParams = this._http.formatParams(httpParams, {pagesize: 8});
      return this._http.get('/personas', httpParams);
    }


}
