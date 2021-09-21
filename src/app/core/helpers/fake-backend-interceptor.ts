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
let listaUsuarios = [
  {personaid: 1, id: 1, nombre: "Carlos", apellido: "Garcia", nro_documento: "23159753", cuil: "20231597538", email:"cgarcia@desarrollohumano.rionegro.gov.ar", localidadid: "5", localidad: "Viedma", rol: 'usuario', username: "cgarcia", created_at: "2019-03-25", fecha_baja: "", baja: false, direccion_ip: "192.10.10.8", descripcion_baja: "" },
  {personaid: 2, id: 2, nombre: "Maria", apellido: "Gonzalez", nro_documento: "14156783", cuil: "20141567835", email:"mgonzalez@desarrollohumano.rionegro.gov.ar", localidadid: "5", localidad: "Viedma", rol: 'usuario', username: "mgonzalez", created_at: "2019-04-02", fecha_baja: "", baja: false, direccion_ip: "192.10.10.8", descripcion_baja: "" },
  {personaid: 3, id: 3, nombre: "Graciela", apellido: "Perez", nro_documento: "16358248", cuil: "20163582485", email:"gperez@desarrollohumano.rionegro.gov.ar", localidadid: "5", localidad: "Viedma", rol: 'usuario', username: "gperez", created_at: "2019-05-03", fecha_baja: "2020-12-05", baja: true, direccion_ip: "192.10.10.8", descripcion_baja: "Por pedido del coordinador de subsidio" },
  {personaid: 4, id: 4, nombre: "Paola", apellido: "Rodriguez", nro_documento: "16322448", cuil: "20163224485", email:"prodriguez@desarrollohumano.rionegro.gov.ar", localidadid: "5", localidad: "Viedma", rol: 'usuario', username: "prodriguez", created_at: "2019-08-06", fecha_baja: "", baja: false, direccion_ip: "192.10.10.8", descripcion_baja: "" },
  {personaid: 5, id: 5, nombre: "Gustavo", apellido: "Acosta", nro_documento: "18334826", cuil: "20183348265", email:"gacosta@desarrollohumano.rionegro.gov.ar", localidadid: "5", localidad: "Viedma", rol: 'usuario', username: "gacosta", created_at: "2019-11-21", fecha_baja: "", baja: false, direccion_ip: "192.10.10.8", descripcion_baja: "" }
];

let listaRolPermiso = [
  {usuarioid: 1, personaid: 1, lista_rol: [{ rol: "usuario", lista_permiso: [] }]},
  {usuarioid: 2, personaid: 2, lista_rol: [{ rol: "usuario_8180", lista_permiso: ['prestacion_crear', 'exportar_cuenta_saldo'] }, { rol: "usuario_8277", lista_permiso: ['prestacion_crear', 'prestacion_borrar'] }]}
]

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
              case url.match(/\/apimock\/usuarios\/buscar-persona-por-cuil\/\d+$/) && method === 'GET':
                  return getUsuarioCuil();
              case url.endsWith('/apimock/usuarios') && method === 'POST':
                  return crearUsuario();
              case url.endsWith('/apimock/personas') && method === 'GET':
                return getPersonas();
              case url.endsWith('/apimock/sub-sucursals') && method === 'GET':
                return getSubSucurasales();
              case url.endsWith('/apimock/tipo-documentos') && method === 'GET':
                return getTipoDocumento();
              case url.endsWith('/apimock/localidads') && method === 'GET':
                return getLocalidad();
              case url.endsWith('/apimock/backend-localidads') && method === 'GET':
                return getBackendLocalidad();
              case url.endsWith('/apimock/localidad-extras') && method === 'GET':
                return getLocalidadExtras();
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
              case url.endsWith('/apimock/usuarios/crear-asignacion') && method === 'POST':
                return agregarPermisosAusuario();
              case url.match(/\/apimock\/usuarios\/baja\/\d+$/) && method === 'PUT':
                return bajaUsuario();
              case url.match(/\/apimock\/usuarios\/listar-asignacion\/\d+$/) && method === 'GET':
                return listarPermisosDeUsuario();
              case url.match(/\/apimock\/usuarios\/\d+$/) && method === 'PUT':
                return actualizarUsuario();
              case url.match(/\/apimock\/usuarios\/\d+$/) && method === 'GET':
                return getUsuarioPorId();
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
              case url.endsWith('/apimock/cuentas') && method === 'POST':
                return crearCuentaBancaria();
              case url.match(/\/apimock\/cuentas\/\d+$/) && method === 'PUT':
                return editarCuentaBancaria();
              case url.endsWith('/apimock/permisos') && method === 'GET':
                return getPermisos();
              case url.endsWith('/apimock/rols') && method === 'GET':
                return getRols();
              case url.endsWith('/apimock/bancos') && method === 'GET':
                return getBancos();
              case url.endsWith('/apimock/exports') && method === 'GET':
                return getListaHistorialExport();
              case url.match(/\/apimock\/exports\/\d+$/) && method === 'GET':
                return getHistorialExport();
              case url.endsWith('/apimock/provincias') && method === 'GET':
                return getProvincias();
              case url.match('/apimock/departamentos') && method === 'GET':
                return getDepartamentos();
              case url.match('/apimock/convenios') && method === 'GET':
                return getConvenios();
            }
        }

        // route functions
        /*** LISTADO DE PROVINCIAS ***/
        function getProvincias() {
          let listadoProvincias = [
            {id: 1, nombre: "Buenos aires",},{id: 2, nombre: "Neuquén"}, {id: 3, nombre: "Río Negro"}
          ];

          return ok(listadoProvincias);
        }
        /*** LISTADO DE DEPARTAMENTOS ***/
        function getDepartamentos() {
          let provinciaid = request.params.get('provinciaid');
          let listadoDepartamentos = [
            {id: 3, nombre: "partido de patagones", provinciaid: 1},{id: 1, nombre: "Confluencia", provinciaid:2}, {id: 2, nombre: "Adolfo Alsina", provinciaid: 3}
          ];

          let depto = listadoDepartamentos.filter(usu => { return usu.provinciaid === parseInt(provinciaid); });

          return ok(depto);
        }
        /*** LISTADO DE BANCOS ***/
        function getBancos() {
          let listadoBancos = [
            {id: 3, nombre: "Nación",},{id: 1, nombre: "Patagonia"}, {id: 1, nombre: "Santander"}
          ];

          return ok(listadoBancos);
        }
        /*** LISTADO DE CONVENIOS ***/
        function getConvenios() {
          let listaConvenio = [{ "id": 1, "nombre": "8180" },{ "id": 2, "nombre": "8277" }];

          return ok(listaConvenio);
        }
        /*** LISTADO DE PERMISOS ***/
        function getPermisos() {
          let rolParam = request.params.get('rol');
          let listaPermisos = [
            { "name": "persona_crear" },{ "name": "persona_modificar" },{ "name": "prestacion_acreditar" },
            { "name": "prestacion_baja" },{ "name": "prestacion_crear" },{ "name": "prestacion_ver" }
          ];

          switch (rolParam) {
            case 'usuario_8180':
              listaPermisos = [
                { "name": "exportar_cuenta_saldo" },{ "name": "prestacion_borrar" },{ "name": "importar_cuenta_bps" }
              ];
              break;
            case 'usuario_8277':
              listaPermisos = [
                { "name": "exportar_cuenta_saldo" },{ "name": "prestacion_borrar" },{ "name": "importar_cuenta_bps" }
              ];
              break;
            default:
              listaPermisos = [
                { "name": "persona_crear" },{ "name": "persona_modificar" },{ "name": "prestacion_crear" },{ "name": "prestacion_borrar" },
                { "name": "exportar_cuenta_saldo" },{ "name": "importar_cuenta_bps" }
              ];
              break;
          }


          return ok(listaPermisos);
        }
        /*** LISTADO DE ROLES ***/
        function getRols() {
          let listaRoles = [{name: "usuario" },{name: "usuario_8180" },{name: "usuario_8277" }]

          return ok(listaRoles);
        }
        /*** LISTADO DE USUARIOS ***/
        function getUsuarios() {
          let params = request.params.get('global_param');
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = 20;

          if (localStorage.getItem("usuarios")) {
            listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));
          }

          let usuarios = { pagesize: pageSize, pages: 1, total_filtrado: 5, resultado: listaUsuarios};

          let listado = paginar(usuarios, usuarios.resultado, page, pageSize);

          return ok(listado);
        }

        function crearCuentaBancaria() {
          let cuenta = body;
          console.log("Crear cuenta bancaria: ",cuenta);

          return ok({id:1});
        }

        function editarCuentaBancaria() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let cuenta = body;
          console.log("Editar cuenta bancaria: ",id);

          return ok({id:1});
        }

        function getUsuarioCuil() {
          let urlParts = request.url.split('/');
          let cuil = urlParts[urlParts.length - 1];

          let listaUsuarios = [
            {personaid: 1, id: 1, nombre: "Carlos", apellido: "Garcia", nro_documento: "23159753", cuil: "20231597538", usuario: { id: 1, email:"cgarcia@desarrollohumano.rionegro.gov.ar", localidadid: "9", localidad: "Viedma", username: "cgarcia", rol: 'usuario', fecha_inicial: "2019-03-25", fecha_ultimo_ingreso: "2020-12-30", direccion_ip: "192.10.10.8" }},
            {personaid: 2, id: 2, nombre: "Pedro", apellido: "Gonzalez", nro_documento: "15156783", cuil: "20151567835" },
          ];

          let usuario = listaUsuarios.filter(usu => { return usu.cuil === cuil; });
          let usuarioEncontrado = usuario.length ? usuario[0] : null;

          if (usuarioEncontrado) {
            return ok({success: true, resultado: usuarioEncontrado});
          }else{
            return ok({success: false, resultado: []});
          }
        }

        function crearUsuario() {
          let usuario = body;

          if (usuario["password"] === usuario["confirmPass"]) {
            return ok();
          } else {
            return error("{\"email\":[\"Esta direcci\\u00f3n de correo electr\\u00f3nico ya ha sido utilizada\"]}");
          }
        }

        function bajaUsuario() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let param = request.body;
          let f = new Date();
          let fechaHoy = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();

          if (localStorage.getItem("usuarios")) {
            listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));
          }

          for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].id == id) {
              if (param.baja) {
                listaUsuarios[i]["fecha_baja"] = fechaHoy;
                listaUsuarios[i]["baja"] = true;
              }else {
                listaUsuarios[i]["fecha_baja"] = "";
                listaUsuarios[i]["baja"] = false;
              }
            }
          }

          localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

          return ok({id: id});
        }

        function getUsuarioPorId() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);

          let usuario = listaUsuarios.filter(usu => { return usu.id === id; });
          let usuarioEncontrado = usuario.length ? usuario[0] : null;

          if (usuarioEncontrado) {
            return ok(usuarioEncontrado);
          }else{
            return error("No se ha podido encontrar este usuario");
          }
        }

        function actualizarUsuario() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          if (id !== 0) {
            return ok({ id: id });
          }else {
            return error('No se puedo actualizar este usuario');
          }
        }

        function listarPermisosDeUsuario() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let listaAsignacion:any = [];

          //listaRolPermiso
          let usuario = listaRolPermiso.filter(usu => { return usu.usuarioid === id; });
          let usuarioEncontrado = usuario.length ? usuario[0] : null;

          console.log(usuarioEncontrado)

          return ok(usuarioEncontrado);
        }


          /* if (localStorage.getItem("asignacion")) {
            listaAsignacion = (JSON.parse(localStorage.getItem("asignacion")) !== undefined) ? JSON.parse(localStorage.getItem("asignacion")) : undefined;
          }


          let lista_permiso: any = [];
          if (listaAsignacion["lista_permiso"].length > 0) {
            for (const k in listaAsignacion.lista_permiso) {
              lista_permiso.push(listaAsignacion.lista_permiso[k].name);
            }
          }
          listaAsignacion.lista_permiso = lista_permiso

          if (listaAsignacion.length !== 0) {
            return ok(listaAsignacion);
          } else {
            return ok({usuarioid: id, lista_permiso: []});
          } */

        function agregarPermisosAusuario() {
          let newPermisos = request.body;
          let listaAsignacion: any = [];
          if (localStorage.getItem("asignacion")) {
            listaAsignacion = JSON.parse(localStorage.getItem("asignacion"));
          }
          listaAsignacion = {
            usuarioid: newPermisos.usuarioid,
            rol: newPermisos.rol,
            lista_permiso: newPermisos.lista_permiso
          };

          localStorage.setItem("asignacion", JSON.stringify(listaAsignacion));

          return of(new HttpResponse({ status: 200 }));
        }

        function login() {
          let datos = body;
          let respuesta: any = {};
          if ( datos.username === 'admin' && datos.password_hash === 'admins' ) {
            respuesta = {
              username: 'Admin', access_token: 'fake-jwt-token', rol: 'admin'
            };

          }else if ( datos.username === 'soporte' && datos.password_hash === 'soportes' ){
            respuesta = {
              username: 'soporte', access_token: 'fake-jwt-token', rol: 'soporte',
              nombre: 'Pedro', apellido: 'Alvarez'
            };
          }else if ( datos.username === 'usuario' && datos.password_hash === 'usuarios' ) {
            respuesta = {
              username: 'usuario', access_token: 'fake-jwt-token', rol: 'usuario',
              nombre: 'Carla', apellido: 'Benitez'
            };
          }else{
            return error("datos mal ingresado");
          }
          return ok(respuesta);
        }
        /*** CREAR PERSONA ***/
        function crearPersona() {
          let persona = body;
          let validar = true;
          let fechaNacimiento = persona['fecha_nacimiento'].split('-');
          // verifico la fecha de nacimiento si es valida
          let personaEsMayor = (2020 - parseInt(fechaNacimiento[0]));
          let errorMsj = '';
          // valido si la persona es mayor
          if (personaEsMayor < 18) {
            errorMsj = "La fecha de nacimiento no es correcta";
            validar = false;
          }

          let personaIgual = personas.resultado.filter(per => { return per.cuil === persona.cuil; })
          let personaEncontrada = personaIgual.length ? personaIgual[0] : null;
          console.log(personaEncontrada.cuil);
          if (personaEncontrada) {
            validar = false;
            errorMsj = "Ya existe la persona";
          }


          if (validar) {
            return ok({ id: 1 });
          } else {
            return error(errorMsj);
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
          let params = request.params.get('global_param');
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = 2;

          console.log(params);

          let personas = { pagesize: pageSize, pages: 1, total_filtrado: 5, resultado: [
            {id: 102,nombre: "Romina", export_at: "2020-09-11", observacion: "una observación", convenio_pendiente: true,apellido: "Rodríguez",sexoid:1,sexo:"Femenino",generoid:1,genero:"Mujer",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29890098",telefono: "2920430690",celular: "2920412127",tipo_documentoid: 1,email:"",cuil:"20298900988", lista_cuenta: [], tiene_cbu: false
            },{ id: 103,nombre: "Gonzalo", export_at: "", observacion: "", convenio_pendiente: false,apellido: "Gimenez",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29232132",telefono: "",celular: "2920412762",tipo_documentoid: 1,email:"",cuil:"20292321328",lugar:{ id:9,barrio:"",calle:"Urquiza",altura:"1327",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }, lista_cuenta: [{ id: 1, cbu: "340220908126708871006", personaid: 102, bancoid: 1, tipo_cuentaid: 1, create_at: "2020-10-29 03:10:52", tesoreria_alta: 0, banco: "Patagonia", tipo_cuenta: "Cuenta Corriente", cuil: "27351545475", apellido: "Marileo", nombre: "Romina Azucena" }], tiene_cbu: true
            },{ id: 104,nombre: "Roberto",export_at: "", observacion: "", convenio_pendiente: false, apellido: "Almendra",sexoid:2,sexo:"Masculino",generoid:2,genero:"Hombre",nacionalidadid:1,estado_civilid:1,estado_civil:"soltero",fecha_nacimiento:"1988-02-05",nro_documento: "29857364",telefono: "",celular: "2920234567",tipo_documentoid: 1,email:"rderoberto@outlook.com.ar",cuil:"20298573648",lugar:{ id:9,barrio:"Fatima",calle:"savedra",altura:"47",piso:"",depto:"",escalera:"",localidadid:1, localidad: "Viedma" }, lista_cuenta: [], tiene_cbu: false}
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

        /****** LISTADO DE CUENTAS - PERSONAS ********/
        function getListaHistorialExport() {
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = 2;

          let Listado = { pagesize: 2, pages: 1, total_filtrado: 6, resultado: [
            /* { id: 1, export_at: "2020-04-03", tipo: "ctasaldo", cantidad: 40 },
            { id: 2, export_at: "2020-03-25", tipo: "ctasaldo", cantidad: 45 },
            { id: 3, export_at: "2020-03-12", tipo: "interbanking", cantidad: 35 },
            { id: 4, export_at: "2020-03-01", tipo: "ctasaldo", cantidad: 35 },
            { id: 5, export_at: "2020-02-24", tipo: "interbanking", cantidad: 20 },
            { id: 6, export_at: "2020-02-15", tipo: "ctasaldo", cantidad: 20 } */
          ]};

          let listado = paginar(Listado, Listado.resultado, page, pageSize);

          return ok(listado);
        }

        function getHistorialExport() {
          let respuesta = {
            exportacion: "8180SANDOVAL                      LUISA ESTER     0010000000000620239000A26021950FSNACIONES UNIDAS    01500    CIPOLLETTI                    08324162                              0082706202390820000                  02082020251            08324                         000000000                       "
          };

          return ok(respuesta);
        }

        /******* IMPORTACION DE CUENTA BPS ***********/

        function importarBps() {

          let msjExitoso = {
            creadas: 5,
            existen: 0,
            /* errors: [
                "No se encuentra registrada la persona ROSA DEL CARMEN CHANDIA cuil:27120571929",
                "No se encuentra registrada la persona CARLOS FRANCISC SINIGUAL cuil:20200486812",
                "No se encuentra registrada la persona MIGUEL ANGEL ACU\\D1A cuil:08231681635",
                "No se encuentra registrada la persona MERCEDES ANABE PE\\D1A cuil:08273058425",
                "No se encuentra registrada la persona ROSA DEL CARMEN CHANDIA cuil:27120571929",
                "No se encuentra registrada la persona CARLOS FRANCISC SINIGUAL cuil:20200486812",
                "No se encuentra registrada la persona MIGUEL ANGEL ACU\\D1A cuil:08231681635",
                "No se encuentra registrada la persona MERCEDES ANABE PE\\D1A cuil:08273058425"
            ] */};

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
        /* LOCALIDADES */
        function getLocalidad() {
          const localidad = [
            {id: 1, nombre: 'Cipolletti', codigo_postal: "8324", provinciaid: 3, departamentoid: 2, departamento: "General Roca"},
            {id: 2, nombre: 'Gral. Roca', codigo_postal: "8332", provinciaid: 3, departamentoid: 2, departamento: "General Roca"},
            {id: 3, nombre: 'San Carlos de Bariloche', codigo_postal: "8400", provinciaid: 3, departamentoid: 2, departamento: "Bariloche"},
            {id: 4, nombre: 'San Javier', codigo_postal: "8501", provinciaid: 3, departamentoid: 2, departamento: "Adolfo Alsina"},
            {id: 5, nombre: 'Viedma', codigo_postal: "8500", provinciaid: 3, departamentoid: 2, departamento: "Adolfo Alsina"}
          ];

          if (localidad) {
            return ok(localidad);
          } else {
            return error("no se pudo obtener localidad");
          }
        }
        /* BACKEND LOCALIDADES  */
        function getBackendLocalidad() {
          const localidad = {
          "total_filtrado": 5,
          "pages": 1,
          "pagesize": 20,
          "resultado":
          [
            {id: 1, nombre: 'Cipolletti', codigo_postal: "8324", provinciaid: 3, departamentoid: 2, departamento: "General Roca"},
            {id: 2, nombre: 'Gral. Roca', codigo_postal: "8332", provinciaid: 3, departamentoid: 2, departamento: "General Roca"},
            {id: 3, nombre: 'San Carlos de Bariloche', codigo_postal: "8400", provinciaid: 3, departamentoid: 2, departamento: "Bariloche"},
            {id: 4, nombre: 'San Javier', codigo_postal: "8501", provinciaid: 3, departamentoid: 2, departamento: "Adolfo Alsina"},
            {id: 5, nombre: 'Viedma', codigo_postal: "8500", provinciaid: 3, departamentoid: 2, departamento: "Adolfo Alsina"}
          ]};

          if (localidad) {
            return ok(localidad);
          } else {
            return error("no se pudo obtener localidad");
          }
        }
        /* LOCALIDADES EXTRAS */
        function getLocalidadExtras() {
          const localidad = {
            "total_filtrado": 5,
            "pages": 1,
            "pagesize": 20,
            "resultado":
            [
              {id: 1, nombre: 'Cipolletti', codigo_postal: "8324", provinciaid: 3, departamentoid: 2, departamento: "General Roca"},
              {id: 2, nombre: 'Gral. Roca', codigo_postal: "8332", provinciaid: 3, departamentoid: 2, departamento: "General Roca"},
              {id: 3, nombre: 'San Carlos de Bariloche', codigo_postal: "8400", provinciaid: 3, departamentoid: 2, departamento: "Bariloche"},
              {id: 4, nombre: 'San Javier', codigo_postal: "8501", provinciaid: 3, departamentoid: 2, departamento: "Adolfo Alsina"},
              {id: 5, nombre: 'Viedma', codigo_postal: "8500", provinciaid: 3, departamentoid: 2, departamento: "Adolfo Alsina"}
            ]};

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
          //return error('[{"persona":"Ana Paula Díaz cuil:20201391999","altura":"El campo número se encuentra vacío"}]');

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

        function nombrePorId(id, lista){
          for (let i = 0; i < lista.length; i++) {
            if (lista[i].id == id){
              return lista[i].nombre;
            }
          }
        }
      }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
