import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve } from "@angular/router";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentaSaldoService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  guardarSeleccionPersona(params:any){
    return this._http.post("/cuenta-saldos", params);
  }

  resolve() {
    return this._http.get('/cuenta-saldos');
  }
}
