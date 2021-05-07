import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve } from "@angular/router";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExportService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  /**
   * busca listado de historial de exportaciones segun sus parametros
   * @param params parametros asignados sobre api
   */
  buscar(params: object) {
    Object.assign(params, { sort: '-export_at' });
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/exports', httpParams);
  }

  descargarArchivo(id:number) {
    return this._http.get('/exports/' + id);
  }

  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, { sort: '-export_at', page: 0, pagesize: 20 });
    return this._http.get('/exports', httpParams);
  }
}
