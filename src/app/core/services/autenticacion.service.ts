import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../models';
import { JwtService } from "./jwt.service";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AutenticacionService {
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;

    constructor(private _http: HttpClient, private _jwt: JwtService) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(this._jwt.getToken());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this._http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this._jwt.saveToken(user);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this._jwt.destroyToken();
        this.currentUserSubject.next(null);
    }
}
