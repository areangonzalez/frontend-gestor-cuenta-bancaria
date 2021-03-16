import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { AutenticacionService, JwtService, LoaderService } from '../services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private service_count = 0;
  constructor(private _auth: AutenticacionService, private _loading: LoaderService, private _router: Router, private _jwtService: JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._loading.show();
      this.service_count++;
        return next.handle(request).pipe(
          catchError(err => {
            // error de inautorizado
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this._auth.logout();
                location.reload(true);
            }
            if (err.status === 403) {
              // auto logout if 401 response returned from api
              const error = err.message || err.error.message || err.statusText;
              return throwError(error);
            }
            if (err.status === 400) {
              console.log(err);
              const error = err.error.message;
              return throwError(error);
            }else {
              const error = err.message || err.error.message || err.statusText;
              return throwError(error);
            }
        }), finalize(() => {
          this.service_count--;
          if ( this.service_count === 0 ) {
            this._loading.hide();
          }
        }))
    }
}
