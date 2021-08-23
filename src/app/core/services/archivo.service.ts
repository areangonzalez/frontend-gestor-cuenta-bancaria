import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ArchivoService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  exportarCtaSaldo(params: any) {
    return this._http.post("/cuenta-saldo/exportar", params);
  }

  exportarCtaInterbanking() {
    return this._http.post("/interbanking/exportar");
  }

  importarCuentaBps(archivo: any) {
    let headers = new Headers();
    headers.set('Content-type', 'multipart/form-data');
    return this._http.post("/cuenta-bps/importar", archivo);
  }
  /**
   * Obtengo el listado que obtengo despues de la importación
   */
  listaCuentaBps(params: object) {
    Object.assign(params, { sort: "-create_at", tesoreria_alta: 0, pagesize: 20 });
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/cuentas', httpParams);
  }

  /**
   * Obtengo el listado de las cuentas importadas
   */
  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, { sort: "-create_at", tesoreria_alta: 0, pagesize: 20, page: 0 });
    return this._http.get('/cuentas', httpParams);
  }
}
