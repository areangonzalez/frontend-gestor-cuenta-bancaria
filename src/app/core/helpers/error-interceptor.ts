import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AutenticacionService, JwtService, LoaderService } from '../services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private envios = 0;
  private recibidos = 0;

  constructor(private _auth: AutenticacionService, private _loading: LoaderService, private _router: Router, private _jwtService: JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._loading.show();
        return next.handle(request).pipe(
          tap(res => {
            // res.type is prod and zero is dev
            let tipoRespuesta = (environment.production) ? res.type : 0 ;
            if (tipoRespuesta === HttpEventType.Sent) {
              // cuento los envios
              this.envios++;
            }

            if (res.type === HttpEventType.Response) {
              // cuento los recibidos
              this.recibidos++;
              // comparo y si son iguales oculto el spinner
              if (this.envios == this.recibidos){
                this._loading.hide();
              }
            }
          }),
          catchError(err => {
            let accessUser = this._jwtService.getToken();
            if (accessUser && accessUser.datosToken){
              this.recibidos++;
            }
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this._auth.logout();
                location.reload(true);
                this._loading.hide();
            }
            if (err.status === 400) {
              this.recibidos++;
              this._loading.hide();
              // auto logout if 401 response returned from api
            }else {
              const error = err.message || err.error.message || err.statusText;
              this._loading.hide();
              return throwError(error);
            }
        }))
    }
}
