import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _api: ApiService) { }
  /**
   * guarda los datos de un usuario
   * @param params datos del usuario
   */
  public guardar(params: object) {
    return this._api.post('/usuarios', params);
  }
  /**
   * lista los usuarios
   */
  public listar() {
    return this._api.get('/usuarios');
  }
  /**
   * buscador de usuarios según su parametro
   * @param params parametros a buscar
   */
  public buscar(params:object) {
    let httpParams = new HttpParams();
    httpParams = this._api.formatParams(httpParams, params);

    return this._api.get('/usuarios',httpParams);
  }
  /**
   * busac a un usuario por id
   * @param id identificador de usuario
   */
  public buscarPorId(id: number) {
    return this._api.get('/usuarios/' + id);
  }
  /**
   * actualiza los datos de un usuario
   * @param params datos del usuario
   * @param id identificador de usuario
   */
  public actualizarUsuario(params:object, id: number) {
    return this._api.put('/usuarios/' + id, params);
  }
  /**
   * Baja de un usuario por id y su razon
   * @param params opciones para el dado de baja
   * @param id identificador del usuario a dar de baja
   */
  public baja(params: object, id: number) {
    return this._api.put('/usuarios/baja/' + id, params);
  }
  /**
   * Realiza una busqueda de persona por numero de cuil
   * @param cuil numero de cuil de la persona
   */
  public buscarPorCuil(cuil: string) {
    return this._api.get('/usuarios/buscar-persona-por-cuil/' + cuil );
  }

  /**
   * Guarda el programa y los permisos del mismo a un usuario
   * @param params { idusuario, rolid, programaid, lista_permisos }
   */
  public asignarPermisos(params: object) {
    return this._api.post("/usuarios/crear-asignacion", params);
  }
  /**
   * obtiene el listado de los programas con us permisos del usuario
   * @param idusuario identificador que define el usuario
   */
  public listarAsignacion(usuarioid:number) {
    return this._api.get("/usuarios/listar-asignacion/" + usuarioid);
  }
  /**
   * Borrado de una asignacion (programa y sus permisos)
   * @param usuarioid
   * @param programaid
   */
  public borrarAsignacion(params: object) {
    return this._api.post("/usuarios/borrar-asignacion", params);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      let httpParams = new HttpParams();
      httpParams = this._api.formatParams(httpParams, { pagesize: 20, pages: 0 });
      return this._api.get('/usuarios', httpParams);
    }

}
