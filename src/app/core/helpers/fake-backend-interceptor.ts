import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

let personas = { pagesize: 2, pages: 1, total_filtrado: 5, resultado: [
  {id: 1,nombre: "Romina",apellido: "Rodríguez",sexoid:1,sexo:"Femenino",generoid:1,genero:"Mujer",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29890098",telefono: "2920430690",celular: "2920412127",tipo_documentoid: 1,email:"",cuil:"20298900988",lugar:{ id:9,barrio:"Don bosco",calle:"Mitre",altura:"327",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }
  },{ id: 2,nombre: "Gonzalo",apellido: "Gimenez",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29232132",telefono: "",celular: "2920412762",tipo_documentoid: 1,email:"",cuil:"20292321328",lugar:{ id:9,barrio:"",calle:"Urquiza",altura:"1327",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }
  },{ id: 3,nombre: "Roberto",apellido: "Almendra",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29857364",telefono: "",celular: "2920234567",tipo_documentoid: 1,email:"rderoberto@outlook.com.ar",cuil:"20298573648",lugar:{ id:9,barrio:"Fatima",calle:"savedra",altura:"47",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }}
  ]};

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
              case url.endsWith('/apimock/usuarios/login') && method === 'POST':
                  return login();
              case url.endsWith('/apimock/personas') && method === 'GET':
                return getPersonas();
              case url.endsWith('/apimock/sub-sucursales') && method === 'GET':
                return getSubSucurasales();
              case url.endsWith('/apimock/tipo-documentos') && method === 'GET':
                return getTipoDocumento();
              case url.endsWith('/apimock/localidads') && method === 'GET':
                return getLocalidad();
              case url.endsWith('/apimock/nacionalidads') && method === 'GET':
                return getNacionalidad();
              case url.endsWith('/apimock/estado-civils') && method === 'GET':
                return getEstadoCivil();
              case url.endsWith('/apimock/sexos') && method === 'GET':
                return getSexo();
              case url.endsWith('/apimock/generos') && method === 'GET':
                return getGenero();
              case url.endsWith('/apimock/cuenta-saldos') && method === 'GET':
                return getListaSeleccionPersona();
              case url.endsWith('/apimock/cuenta-saldos') && method === 'POST':
                  return guardarListaSeleccionPersona();
              case url.match(/\/apimock\/cuenta\/\d+$/) && method === 'GET':
                return getPersonasPorId();
              case url.match(/\/apimock\/personas\/\d+$/) && method === 'PUT':
                return editarPersona();
              case url.endsWith('/apimock/personas') && method === 'POST':
                return crearPersona();
            }
        }

        // route functions

        function login() {
          let datos = body;
          if ( datos.username === 'admin' && datos.password_hash === 'admins' ) {
            let respuesta = {
              username: 'Admin', access_token: 'fake-jwt-token'
            };

            return ok(respuesta);
          }else{
            return error("datos mal ingresado");
          }
        }
        /*** CREAR PERSONA ***/
        function crearPersona() {
          let persona = body;
          let validar = false;
          let fechaNacimiento = persona['fecha_nacimiento'].split('-');
          // verifico la fecha de nacimiento si es valida
          let personaEsMayor = (2020 - parseInt(fechaNacimiento[0]));
          console.log(personaEsMayor);

          // valido si la persona es mayor
          if (personaEsMayor > 18) {
            validar = true;
          }

          if (validar) {
            return ok({ id: 1 });
          } else {
            return error("La fecha de nacimiento no es correcta");
          }
        }

        function editarPersona() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let persona = body;
          let validar = false;
          let fechaNacimiento = persona['fecha_nacimiento'].split('-');
          // verifico la fecha de nacimiento si es valida
          let personaEsMayor = (2020 - parseInt(fechaNacimiento[0]));

          // valido si la persona es mayor
          if (personaEsMayor > 18) {
            validar = true;
          }

          if (validar && id) {
            return ok({ id: id });
          } else {
            return error("La fecha de nacimiento no es correcta");
          }
        }
        /*** PERSONA POR ID ***/
        function getPersonasPorId() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let personaEncontrada = personas.resultado.filter(p => { return p.id === id });

          if (personaEncontrada !== null) {
            return ok(personaEncontrada[0]);
          } else {
            return error("Esta persona no se encuentra");
          }
        }
        /*** LISTADO DE PERSONAS ***/
        function getPersonas() {
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = 2;

          let personas = { pagesize: pageSize, pages: 1, total_filtrado: 5, resultado: [
            {id: 1,nombre: "Romina",apellido: "Rodríguez",sexoid:1,sexo:"Femenino",generoid:1,genero:"Mujer",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29890098",telefono: "2920430690",celular: "2920412127",tipo_documentoid: 1,email:"",cuil:"20298900988",lugar:{ id:9,barrio:"Don bosco",calle:"Mitre",altura:"327",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }
            },{ id: 2,nombre: "Gonzalo",apellido: "Gimenez",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29232132",telefono: "",celular: "2920412762",tipo_documentoid: 1,email:"",cuil:"20292321328",lugar:{ id:9,barrio:"",calle:"Urquiza",altura:"1327",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }
            },{ id: 3,nombre: "Roberto",apellido: "Almendra",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29857364",telefono: "",celular: "2920234567",tipo_documentoid: 1,email:"rderoberto@outlook.com.ar",cuil:"20298573648",lugar:{ id:9,barrio:"Fatima",calle:"savedra",altura:"47",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }}
            ]};

          let listado = paginar(personas, personas.resultado, page, pageSize);

          return ok(listado);
        }
        /****** LISTADO DE SELECCION DE PERSONAS  ******/
        function getListaSeleccionPersona() {
          let listaSeleccion = [];

          if (localStorage.getItem("listadoSeleccion")) {
            listaSeleccion = JSON.parse(localStorage.getItem("listadoSeleccion"));
          }

          return ok(listaSeleccion);
        }
        /****** GUARADR LISTADO DE PERSONAS SELECCIONADAS ******/
        function guardarListaSeleccionPersona() {
          let listaSeleccion = body;

          console.log(body);

          localStorage.setItem("listadoSeleccion", JSON.stringify(listaSeleccion));

          if (listaSeleccion.length > 0) {
            return ok(listaSeleccion);
          }else{
            return error("falla al guardar");
          }

        }
        /*** LISTADO DE SUB SUCURSALES ***/
        function getSubSucurasales() {
          const subSucrsales = [
            {id: 1,localidad: "Allen",codigo_postal: "8328",codigo: "161014",sucursalid: 14,nombre: "Allen (Suc. Allen)",sucursal_codigo: "265"},{id: 2,localidad: "Bariloche",codigo_postal: "8400",codigo: "161399",sucursalid: 3,nombre: "Bariloche (Suc. Bariloche)",sucursal_codigo: "255"},{id: 3,localidad: "Pilcaniyeu",codigo_postal: "8412",codigo: "161355",sucursalid: 3,nombre: "Pilcaniyeu (Suc. Bariloche)",sucursal_codigo: "255"}
          ];

            return ok(subSucrsales);
        }

        function getTipoDocumento() {
          const tipoDocumento = [
            {id: 1, nombre: 'cedula de identitad'},{id: 2, nombre: 'DNI'}
          ];

          if (tipoDocumento) {
            return ok(tipoDocumento);
          } else {
            return error("no se pudo obtener tipoDocumento");
          }
        }
        function getNacionalidad() {
          const nacionalidad = [
            {id: 1, nombre: 'argentino/a'},{id: 2, nombre: 'boliviano/a'},{id: 3, nombre: 'brasilero/a'},{id: 4, nombre: 'colombiano/a'},{id: 5, nombre: 'costarrisence/a'},
          ];

          if (nacionalidad) {
            return ok(nacionalidad);
          } else {
            return error("no se pudo obtener nacionalidad");
          }
        }
        function getEstadoCivil() {
          const estadoCivil = [
            {id: 1, nombre: 'soltero'}
          ];

          if (estadoCivil) {
            return ok(estadoCivil);
          } else {
            return error("no se pudo obtener estadoCivil");
          }
        }
        function getSexo() {
          const sexo = [
            {id: 1, nombre: 'Femenino'},{id: 2, nombre: 'Masculino'}
          ];

          if (sexo) {
            return ok(sexo)
          } else {
            return error("no se pudo obtener sexo");
          }
        }
        function getGenero() {
          const genero = [
            {id: 2, nombre: 'Hombre'},{id: 1, nombre: 'Mujer'},{id: 1, nombre: 'Pansexual '}
          ];

          if (genero) {
            return ok(genero);
          } else {
            return error("no se pudo obtener genero");
          }
        }
        function getLocalidad() {
          const localidad = [
            {id: 1, nombre: 'Cipolletti'},{id: 2, nombre: 'Gral. Roca'},{id: 3, nombre: 'San Carlos de Bariloche'},{id: 4, nombre: 'San Javier'},{id: 5, nombre: 'Viedma'}
          ];

          if (localidad) {
            return ok(localidad);
          } else {
            return error("no se pudo obtener localidad");
          }
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

        function paginar(listadoOrigen: any, listaEncontrados: any, page: number, pageSize: number) {
          let totalFiltrado:number = listaEncontrados.length;
          let total:number = totalFiltrado/pageSize;
          let numEntero = Math.floor(total);
          let totalPagina:number = (total > numEntero) ? numEntero + 1 : total;
          listadoOrigen.total_filtrado = listaEncontrados.length;
          listadoOrigen.pages = totalPagina;

          if (page > 0) {
            page = page;
            let pageStart = page * pageSize;
            let pageEnd = pageStart + pageSize;
            listadoOrigen.resultado = listaEncontrados.slice(pageStart, pageEnd);
          }else{
            listadoOrigen.resultado = listaEncontrados.slice(0,pageSize);
          }

          return listadoOrigen;
        }
      }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
