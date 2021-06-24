import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PrestacionService {

  constructor(private _http: ApiService) { }

  borrar(id:number) {
    return this._http.delete('/prestacions/' + id);
  }

  borrarPendiente(id:number) {
    return this._http.delete('/prestacions/borrar-pendiente/' + id);
  }

}
