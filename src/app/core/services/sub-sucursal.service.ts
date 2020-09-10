import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SubSucursalService {

  constructor(private _http: ApiService) { }

  resolve() {
    return this._http.get('/sub-sucursales');
  }
}
