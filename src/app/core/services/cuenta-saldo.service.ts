import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CuentaSaldoService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  guardarSeleccionPersona(params:any){
    return this._http.post("/cuenta-saldos", params);
  }

  listado() {
    return this._http.get('/cuenta-saldos');
  }

  resolve() {
    return this._http.get('/cuenta-saldos');
  }
}
