import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestacionService implements Resolve<any>{

  constructor(private _http: ApiService) { }

  borrar(id:number) {
    return this._http.delete('/prestacions/' + id);
  }

  borrarPendiente(id:number) {
    return this._http.delete('/prestacions/borrar-pendiente/' + id);
  }

  guardar(params:any) {
    return this._http.post('/prestacions', params);
  }

  buscar(params:any) {
    params["estado"] = 4;
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);
    return this._http.get('/prestacions', httpParams);
  }

  listar() {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, {estado: 4});
    return this._http.get('/prestacions', httpParams);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      let httpParams = new HttpParams();
      httpParams = this._http.formatParams(httpParams, {estado: 4});
      return this._http.get('/prestacions', httpParams);
      }


}
