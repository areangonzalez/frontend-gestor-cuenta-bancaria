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

  exportarCtaInterbanking(params: any) {
    let headers = new Headers();
    /* let httpParams = new HttpParams();
    let convertParams = { cuenta_saldo: JSON.stringify(params) }
    httpParams = this._http.formatParams(httpParams, params); */
    headers.append('Content-type', 'aplication/json');
    headers.append('Accept', 'text/plain');

    let options: object = {
      responseType: 'txt',
      params: params,
    };

    return this._http.getFile("/cuenta-saldo/exportar", params);
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
    Object.assign(params, { tesoreria_alta: 0 });
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/cuentas');
  }

  /**
   * Obtengo el listado que obtengo despues de la importación
   */
  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, { tesoreria_alta: 0 });
    return this._http.get('/cuentas');
  }
}
