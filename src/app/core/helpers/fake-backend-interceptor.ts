import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

let personas = { pagesize: 2, pages: 1, total_filtrado: 5, resultado: [
  {id: 102,nombre: "Romina",apellido: "Rodríguez",sexoid:1,sexo:"Femenino",generoid:1,genero:"Mujer",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29890098",telefono: "2920430690",celular: "2920412127",tipo_documentoid: 1,email:"",cuil:"20298900988",lugar:{ id:9,barrio:"Don bosco",calle:"Mitre",altura:"327",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }
  },{ id: 103,nombre: "Gonzalo",apellido: "Gimenez",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29232132",telefono: "",celular: "2920412762",tipo_documentoid: 1,email:"",cuil:"20292321328",lugar:{ id:9,barrio:"",calle:"Urquiza",altura:"1327",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }
  },{ id: 104,nombre: "Roberto",apellido: "Almendra",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29857364",telefono: "",celular: "2920234567",tipo_documentoid: 1,email:"rderoberto@outlook.com.ar",cuil:"20298573648",lugar:{ id:9,barrio:"Fatima",calle:"savedra",altura:"47",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }}
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
              case url.endsWith('/apimock/usuarios') && method === 'GET':
                  return getUsuarios();
              case url.endsWith('/apimock/personas') && method === 'GET':
                return getPersonas();
              case url.endsWith('/apimock/sub-sucursals') && method === 'GET':
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
              case url.endsWith('/apimock/cuentas') && method === 'GET':
                  return getListaCuentaPersona();
              case url.endsWith('/apimock/cuenta-saldos') && method === 'GET':
                return getListaSeleccionPersona();
              case url.endsWith('/apimock/cuenta-saldos') && method === 'POST':
                  return guardarListaSeleccionPersona();
              case url.match(/\/apimock\/personas\/\d+$/) && method === 'GET':
                return getPersonasPorId();
              case url.match(/\/apimock\/personas\/\d+$/) && method === 'PUT':
                return editarPersona();
              case url.endsWith('/apimock/personas') && method === 'POST':
                return crearPersona();
              case url.endsWith('/apimock/cuenta-saldo/exportar') && method === 'POST':
                return exportacionCtaSaldo();
              case url.endsWith('/apimock/cuenta-bps/importar') && method === 'POST':
                return importarBps();
              case url.endsWith('/apimock/interbanking/exportar') && method === 'POST':
                return exportacionInterbanking();
            }
        }

        // route functions
        /*** LISTADO DE Usuarios ***/
        function getUsuarios() {
          let params = request.params.get('global_param');
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = 2;
          console.log("llego");

          let usuarios = { pagesize: pageSize, pages: 1, total_filtrado: 5, resultado: [
            {id: 1, nombre: "Carlos", apellido: "Garcia", username: "cgarcia", created_at: "1560617468681", fecha_baja: "", baja: false, last_login_at: "2020-12-30",  direccion_ip: "192.10.10.8" },
            {id: 2, nombre: "Maria", apellido: "Gonzalez", username: "mgonzalez", created_at: "2019-04-02", fecha_baja: "", baja: false, last_login_at: "2020-12-20", direccion_ip: "192.10.10.8" },
            {id: 3, nombre: "Graciela", apellido: "Perez", username: "gperez", created_at: "2019-05-03", fecha_baja: "2020-12-05", baja: true, last_login_at: "2020-12-30", direccion_ip: "192.10.10.8" },
            {id: 4, nombre: "Paola", apellido: "Rodriguez", username: "prodriguez", created_at: "2019-08-06", fecha_baja: "", baja: false, last_login_at: "2020-12-23", direccion_ip: "192.10.10.8" },
            {id: 5, nombre: "Gustavo", apellido: "Acosta", username: "gacosta", created_at: "2019-11-21", fecha_baja: "", baja: false, last_login_at: "2020-12-29", direccion_ip: "192.10.10.8" },
          ]};

          let listado = paginar(usuarios, usuarios.resultado, page, pageSize);

          return ok(listado);
        }

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
          console.log(id);

          if (personaEncontrada !== null) {
            return ok(personaEncontrada[0]);
          } else {
            return error("Esta persona no se encuentra");
          }
        }
        /*** LISTADO DE PERSONAS ***/
        function getPersonas() {
          let params = request.params.get('global_param');
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = 2;

          console.log(params);

          let personas = { pagesize: pageSize, pages: 1, total_filtrado: 5, resultado: [
            {id: 102,nombre: "Romina",apellido: "Rodríguez",sexoid:1,sexo:"Femenino",generoid:1,genero:"Mujer",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29890098",telefono: "2920430690",celular: "2920412127",tipo_documentoid: 1,email:"",cuil:"20298900988", lista_cuenta: [], tiene_cbu: false
            },{ id: 103,nombre: "Gonzalo",apellido: "Gimenez",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29232132",telefono: "",celular: "2920412762",tipo_documentoid: 1,email:"",cuil:"20292321328",lugar:{ id:9,barrio:"",calle:"Urquiza",altura:"1327",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }, lista_cuenta: [{ id: 1, cbu: "340220908126708871006", personaid: 102, bancoid: 1, tipo_cuentaid: 1, create_at: "2020-10-29 03:10:52", tesoreria_alta: 0, banco: "Patagonia", tipo_cuenta: "Cuenta Corriente", cuil: "27351545475", apellido: "Marileo", nombre: "Romina Azucena" }], tiene_cbu: true
            },{ id: 104,nombre: "Roberto",apellido: "Almendra",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29857364",telefono: "",celular: "2920234567",tipo_documentoid: 1,email:"rderoberto@outlook.com.ar",cuil:"20298573648",lugar:{ id:9,barrio:"Fatima",calle:"savedra",altura:"47",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }, lista_cuenta: [], tiene_cbu: false}
            ]};

          let listado = paginar(personas, personas.resultado, page, pageSize);

          return ok(listado);
        }
        /****** LISTADO DE CUENTAS - PERSONAS ********/
        function getListaCuentaPersona() {
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = 2;

          let cuentaPersona = { pagesize: 2, pages: 1, total_filtrado: 5, resultado: [
            { id: 1, cbu: "0340220908126708871006", personaid: 102, bancoid: 1, tipo_cuentaid: 1, create_at: "2020-10-29 14:10:34", tesoreria_alta: 1, banco: "Patagonia",
              tipo_cuenta: "Cuenta Corriente", apellido: "Marileo", nombre: "Romina Azucena", cuil: "27351545475", nro_documento: "35154547", telefono: "", celular: "", email: "",
              lugar: { id: 464, nombre: "", calle: "hipolito yrigoyen", altura: "771", localidadid: 2576, latitud: "", longitud: "", barrio: "", piso: "", depto: "", escalera: "", entre_calle_1: "", entre_calle_2: "", localidad: "General Roca", codigo_postal: 8332 }},
            { id: 1, cbu: "0340220908126708871006", personaid: 103, bancoid: 1, tipo_cuentaid: 1, create_at: "2020-10-29 14:10:34", tesoreria_alta: 1, banco: "Patagonia",
              tipo_cuenta: "Cuenta Corriente", apellido: "Fernandez", nombre: "Maria Carla", cuil: "23345546772", nro_documento: "34554677", telefono: "", celular: "298657348", email: "fmcarla@gmail.com",
              lugar: { id: 464, nombre: "", calle: "san luis", altura: "171", localidadid: 2576, latitud: "", longitud: "", barrio: "", piso: "", depto: "", escalera: "", entre_calle_1: "", entre_calle_2: "", localidad: "General Roca", codigo_postal: 8332 }},
            { id: 1, cbu: "0340220908126708871006", personaid: 104, bancoid: 1, tipo_cuentaid: 1, create_at: "2020-10-29 14:10:34", tesoreria_alta: 1, banco: "Patagonia",
              tipo_cuenta: "Cuenta Corriente", apellido: "Gimenez", nombre: "Gabriela Elizabeth", cuil: "22298900984", nro_documento: "29890098", telefono: "2984456876", celular: "", email: "",
              lugar: { id: 464, nombre: "", calle: "mexico", altura: "61", localidadid: 2576, latitud: "", longitud: "", barrio: "", piso: "", depto: "", escalera: "", entre_calle_1: "", entre_calle_2: "", localidad: "General Roca", codigo_postal: 8332 }},
            { id: 1, cbu: "0340220908126708871006", personaid: 105, bancoid: 1, tipo_cuentaid: 1, create_at: "2020-10-29 14:10:34", tesoreria_alta: 1, banco: "Patagonia",
              tipo_cuenta: "Cuenta Corriente", apellido: "Cullumilla", nombre: "Rocio Aldana", cuil: "27292321325", nro_documento: "29232132", telefono: "4376829", celular: "", email: "aldanita@gmail.com",
              lugar: { id: 464, nombre: "", calle: "roca", altura: "1771", localidadid: 2576, latitud: "", longitud: "", barrio: "", piso: "1", depto: "B", escalera: "", entre_calle_1: "", entre_calle_2: "", localidad: "General Roca", codigo_postal: 8332 }},
            { id: 1, cbu: "0340220908126708871006", personaid: 106, bancoid: 1, tipo_cuentaid: 1, create_at: "2020-10-29 14:10:34", tesoreria_alta: 1, banco: "Patagonia",
              tipo_cuenta: "Cuenta Corriente", apellido: "Fernandez", nombre: "Romina Alejandra", cuil: "27298573645", nro_documento: "29857364", telefono: "", celular: "", email: "",
              lugar: { id: 464, nombre: "", calle: "roca", altura: "1771", localidadid: 2576, latitud: "", longitud: "", barrio: "", piso: "3", depto: "B", escalera: "", entre_calle_1: "", entre_calle_2: "", localidad: "General Roca", codigo_postal: 8332 }},
          ]};

          let listado = paginar(cuentaPersona, cuentaPersona.resultado, page, pageSize);

          return ok(listado);
        }

        /******* IMPORTACION DE CUENTA BPS ***********/

        function importarBps() {

          let msjExitoso = {
            creadas: 59,
            existen: 5,
            errors: [
                "No se encuentra registrada la persona ROSA DEL CARMEN CHANDIA cuil:27120571929",
                "No se encuentra registrada la persona CARLOS FRANCISC SINIGUAL cuil:20200486812",
                "No se encuentra registrada la persona MIGUEL ANGEL ACU\\D1A cuil:08231681635",
                "No se encuentra registrada la persona MERCEDES ANABE PE\\D1A cuil:08273058425",
                "No se encuentra registrada la persona ROSA DEL CARMEN CHANDIA cuil:27120571929",
                "No se encuentra registrada la persona CARLOS FRANCISC SINIGUAL cuil:20200486812",
                "No se encuentra registrada la persona MIGUEL ANGEL ACU\\D1A cuil:08231681635",
                "No se encuentra registrada la persona MERCEDES ANABE PE\\D1A cuil:08273058425"
            ]};

            return ok(msjExitoso);

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
            {id: 1,localidad: "Allen",codigo_postal: "8328",codigo: "161014",sucursalid: 14,nombre: "Allen (Suc. Allen)",sucursal_codigo: "265"},{id: 2,localidad: "Bariloche",codigo_postal: "8400",codigo: "161399",sucursalid: 3,nombre: "Bariloche (Suc. Bariloche)",sucursal_codigo: "255"},{id: 3,localidad: "Pilcaniyeu",codigo_postal: "8412",codigo: "161355",sucursalid: 3,nombre: "Pilcaniyeu (Suc. Bariloche)",sucursal_codigo: "255"},{id: 4,localidad: "C. Belisle",codigo_postal: "8364",codigo: "161127",sucursalid: 1,nombre: "C. Belisle (Suc. Cinco Saltos)",sucursal_codigo: "256"}
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

        function exportacionCtaSaldo() {
          let param = body;

          let respuesta = {
            cuenta_saldo: "8180SANDOVAL                      LUISA ESTER     0010000000000620239000A26021950FSNACIONES UNIDAS    01500    CIPOLLETTI                    08324162                              0082706202390820000                  02082020251            08324                         000000000                       "
          };

          return ok(respuesta);
        }

        function exportacionInterbanking() {

          let respuesta = {
            interbanking: "8180SANDOVAL                      LUISA ESTER     0010000000000620239000A26021950FSNACIONES UNIDAS    01500    CIPOLLETTI                    08324162                              0082706202390820000                  02082020251            08324                         000000000                       "
          };

          return ok(respuesta);
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
