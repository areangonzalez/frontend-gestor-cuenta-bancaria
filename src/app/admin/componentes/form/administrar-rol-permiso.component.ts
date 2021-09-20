import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService, UsuarioService, PermisosService } from './../../../core/services';

@Component({
  selector: 'admin-administrar-rol-permiso-form',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.scss']
})
export class AdministrarRolPermisoComponent implements OnInit {
  @Input("idUsuario") private idUsuario: number;
  @Input("listaRoles") public listaRoles: any;
  @Input("listaPermisos") public listaPermisos: any;
  @Input("baja") public baja: boolean;
  public user: FormGroup;
  public submitted: boolean = false;
  public listaUsuarioConRolyPermisos: any = {lista_permiso: []};
  public permisosSeleccionados: any = [];

  constructor(private _msj: NotificacionService, private _usuarioService: UsuarioService, private _fb: FormBuilder) {
    this.user = _fb.group({
      rol: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.obtenerListaPermisos(this.idUsuario);
  }
  /**
   * Obtiene el listado de roles con sus permisos del usuario
   * @param idUsuario identificador del usuario
   */
  obtenerListaPermisos(idUsuario: number) {
    this._usuarioService.listarAsignacion(idUsuario).subscribe(
      respuesta => {
        console.log(respuesta);

        // guardo el listado con roles y sus permisos
        this.listaUsuarioConRolyPermisos = respuesta;
      }, error => { this._msj.cancelado(error); }
    )
  }
  /**
   * Valido los datos antes de asignar los permisos
   */
  validarDatos() {
    if (this.user.invalid) {
      return;
    }else{
      let params: any  = {
        usuarioid: this.idUsuario,
        rol: this.user.value.rol,
        lista_permiso: this.permisosSeleccionados
      };

      this.guardar(params)
    }
  }
  /**
   * se asignan los permisos al usuario
   * @param params listado de permisos con el id del usuario
   */
  guardar(params: object) {
    this._usuarioService.asignarPermisos(params).subscribe(
      respuesta => {
        this._msj.exitoso("Se han agregado correctamente el programa y los permisos al usuario.");
        this.obtenerListaPermisos(this.idUsuario);
      }, error => { this._msj.cancelado(error); }
    );
  }

}
