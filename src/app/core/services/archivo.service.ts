import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

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

  importarArchivo(archivo: any) {
    return this._http.post("/importar/cta-bps", archivo);
  }
}
