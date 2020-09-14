import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private _http: ApiService) { }

  exportarCtaSaldo(params: any) {
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

  importarArchivo() {
    console.log("hola");
  }
}
