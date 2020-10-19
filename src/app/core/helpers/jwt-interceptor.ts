import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _jwtService: JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        let currentUser = this._jwtService.getToken();
        const isLoggedIn = currentUser && currentUser.datosToken && currentUser.datosToken.token;
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${currentUser.datosToken.token}`
                }
            });
        }
        return next.handle(request);
    }
}
