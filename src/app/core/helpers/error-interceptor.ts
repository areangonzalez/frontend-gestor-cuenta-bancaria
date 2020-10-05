import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AutenticacionService, LoaderService } from '../services';
import { environment } from 'src/environments/environment';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private envios = 0;
  private recibidos = 0;

  constructor(private _auth: AutenticacionService, private _loading: LoaderService) { }

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
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this._auth.logout();
                //location.reload(true);
            }
            console.log(err);
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
