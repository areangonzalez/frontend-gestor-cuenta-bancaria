import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SubSucursalService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  resolve() {
    return this._http.get('/sub-sucursales');
  }
}
