import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(1500))
            .pipe(dematerialize());

        function handleRoute() {

            switch (true) {
              case url.endsWith('/apimock/personas') && method === 'GET':
                return getPersonas();
              case url.endsWith('/apimock/sub-sucursales') && method === 'GET':
                return getSubSucurasales();
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function getPersonas() {
          let personas = [
            { nombre: "Romina",apellido: "Rodríguez",nro_documento: "29890098",telefono: "2920430690",celular: "2920412127",tipo_documentoid: 1,email:"rom_rodiguez@gmail.com",cuil:"20298900988",lugar:{ id:9,barrio:"Don bosco",calle:"Mitre",altura:"327",piso:"",depto:"",escalera:"",localidadid:1 }
            },{ nombre: "Gonzalo",apellido: "Gimenez",nro_documento: "29232132",telefono: "2920430728",celular: "2920412762",tipo_documentoid: 1,email:"ggonzalo@hotmail.com.ar",cuil:"20292321328",lugar:{ id:9,barrio:"Fatima",calle:"Urquiza",altura:"1327",piso:"",depto:"",escalera:"",localidadid:1 }
            },{ nombre: "Roberto",apellido: "Almendra",nro_documento: "29857364",telefono: "2920456756",celular: "2920234567",tipo_documentoid: 1,email:"rderoberto@outlook.com.ar",cuil:"20298573648",lugar:{ id:9,barrio:"Fatima",calle:"savedra",altura:"47",piso:"",depto:"",escalera:"",localidadid:1 }}
            ];

            return ok(personas);
        }

        function getSubSucurasales() {
          const subSucrsales = [
            {id: 1,localidad: "Allen",codigo_postal: "8328",codigo: "161014",sucursalid: 14,nombre: "Allen (Suc. Allen)",sucursal_codigo: "265"},{id: 2,localidad: "Bariloche",codigo_postal: "8400",codigo: "161399",sucursalid: 3,nombre: "Bariloche (Suc. Bariloche)",sucursal_codigo: "255"},{id: 3,localidad: "Pilcaniyeu",codigo_postal: "8412",codigo: "161355",sucursalid: 3,nombre: "Pilcaniyeu (Suc. Bariloche)",sucursal_codigo: "255"}
          ];

            return ok(subSucrsales);
        }


        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
