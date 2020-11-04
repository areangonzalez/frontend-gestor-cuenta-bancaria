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
    let headers = new Headers();
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);
    headers.append('Content-type', 'aplication/json');
    headers.append('Accept', 'text/plain');

    let options: object = {
      responseType: 'blob',
      params: httpParams,
    };

    return this._http.getFile("/export/cta-saldo", options);
  }

  exportarCtaInterbanking(params: any) {
    let headers = new Headers();
    let httpParams = new HttpParams();
    let convertParams = { cuenta_saldo: JSON.stringify(params) }
    httpParams = this._http.formatParams(httpParams, params);
    headers.append('Content-type', 'aplication/json');
    headers.append('Accept', 'text/plain');

    let options: object = {
      //responseType: 'blob',
      //params: httpParams,
    };

    return this._http.getFile("/export/cta-saldo", params);
  }


  /* descargarExcel(params) {
    let headers = new Headers();
    let httpParams = new HttpParams();
    httpParams = this._apiService.formatParams(httpParams, params);
    headers.append('Content-type', 'aplication/json');
    headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let options: object = {
      responseType: 'blob',
      params: httpParams,
    };
    return this._apiService.getFile('/export/exportar-prestaciones-xls', options);
  } */

  importarCuentaBps(archivo: any) {
    return this._http.post("/importar/cta-bps", archivo);
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
