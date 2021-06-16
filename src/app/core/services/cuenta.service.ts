import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve } from "@angular/router";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentaService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  /**
   * busca personas segun sus parametros
   * @param params parametros asignados sobre api
   */
  buscar(params: object) {
    Object.assign(params, { tesoreria_alta: 1 });
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/cuentas', httpParams);
  }

  guardar(params: object, id?: number) {
    if (id) {
      return this._http.put('/cuentas/' + id, params);
    }else {
      return this._http.post('/cuentas', params);
    }
  }

  borrar(id: number) {
    return this._http.delete('/cuentas/' + id);
  }

  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, { tesoreria_alta: 1, page: 0, pagesize: 20 });
    return this._http.get('/cuentas', httpParams);
  }
}
