import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private _http: ApiService) { }

  guardar(params: object, id: number) {
    if (id !== 0) {
      return this._http.put('/personas/' + id, params);
    }else {
      return this._http.post('/personas', params);
    }
  }

  buscar(params: object) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/personas', httpParams);
  }

  resolve() {
    return this._http.get('/personas');
  }

}
