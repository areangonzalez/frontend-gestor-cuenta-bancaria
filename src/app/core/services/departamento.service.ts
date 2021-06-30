import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private _http: ApiService) { }

  public buscarPorProvinciaId(provinciaid: number) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, {"provinciaid": provinciaid});
    return this._http.get("/departamentos", httpParams);
  }
}
