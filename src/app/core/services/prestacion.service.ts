import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AutenticacionService } from '.';

@Injectable({
  providedIn: 'root'
})
export class PrestacionService implements Resolve<any>{

  constructor(private _http: ApiService, private _user: AutenticacionService) { }

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

  private convenioUser(params: any) {
    let tipoConvenio = this._user.getConvenioUser();

      if (tipoConvenio.convenio.length == 1) {
        params["tipo_convenioid"] = tipoConvenio.convenio[0].id;
      }

      return params;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      let httpParams = new HttpParams();
      let params = {estado: 4};
      params = this.convenioUser(params);

      httpParams = this._http.formatParams(httpParams, params);
      return this._http.get('/prestacions', httpParams);
      }


}
