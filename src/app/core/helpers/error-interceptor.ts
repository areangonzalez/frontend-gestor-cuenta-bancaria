import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { AutenticacionService, NotificacionService, LoaderService } from '../services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private service_count = 0;
  constructor(private _auth: AutenticacionService, private _loading: LoaderService, private _router: Router, private _msj: NotificacionService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._loading.show();
      this.service_count++;
        return next.handle(request).pipe(
          catchError(err => {
            // error de inautorizado
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this._auth.logout();
                /* this._router.navigate(['./login']); */
                window.location.reload();
            }
            if (err.status === 403) {
              // auto logout if 401 response returned from api
              const error = err.error.message || err.statusText;
              this._msj.cancelado(error);
              return throwError(error);
            }
            if (err.status === 400) {
              const error = this.convertArray(err.error.message) || err.statusText;
              return throwError(error);
            }else {
              const error = err.error.message || err.statusText;
              return throwError(error);
            }
        }), finalize(() => {
          this.service_count--;
          if ( this.service_count === 0 ) {
            this._loading.hide();
          }
        }))
    }


    convertArray(mensaje: any) {
      try {
        const error = JSON.parse(mensaje);

        return error;
      }catch {
        return mensaje
      }
    }
}
