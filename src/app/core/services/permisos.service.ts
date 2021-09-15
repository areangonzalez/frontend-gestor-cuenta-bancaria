import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosService implements Resolve<any> {

  constructor( private _api: ApiService) { }

  public listar() {
    return this._api.get('/permisos');
  }

  public permisoPorRol(rol: string) {
    let httpParams = new HttpParams();
      httpParams = this._api.formatParams(httpParams, { rol: rol });
    return this._api.get('/permisos', httpParams);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
        return this._api.get('/permisos');
    }
}
