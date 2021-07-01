import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  public buscarPorDepartamentoId(departamentoid: number) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, {"departamentoid": departamentoid});
    return this._http.get("/localidades", httpParams);
  }

  public guardar(params: object, id?: number) {
    if (id) { // Editar
      return this._http.put("/localidades/" + id, params);
    } else { // Crear
      return this._http.post("/localidades", params);
    }
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
    return this._http.get('/localidads');
  }
}
