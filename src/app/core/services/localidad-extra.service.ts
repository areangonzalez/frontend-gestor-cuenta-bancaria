import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadExtraService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  borrar(id: number) {
    return this._http.delete('/localidad-extras/' + id);
  }

  buscar(params: object) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);
    return this._http.get('/localidad-extras', httpParams);
  }

  guardar(localidadid: number) {
    return this._http.post('/localidad-extras', { localidadid: localidadid });
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      return this._http.get('/localidad-extras');
    }
}
